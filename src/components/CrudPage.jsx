// src/components/CrudPage.jsx
import React, { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { createRecord, deleteRecord, updateRecord } from "../services/firestoreService";
import { canDeleteRecords, canManageRecords } from "../utils/permissions";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import DataTable from "./DataTable";
import EmptyState from "./EmptyState";
import FormInput from "./FormInput";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import Toast from "./Toast";

function getDefaultForm(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? "";
    return acc;
  }, {});
}

function normalizeData(fields, form) {
  const output = {};
  fields.forEach((field) => {
    let value = form[field.name];
    if (field.type === "number" || field.type === "currency") {
      value = value === "" || value === null || value === undefined ? 0 : Number(value);
    }
    output[field.name] = value;
  });
  return output;
}

function CrudPage({
  title,
  subtitle,
  collectionName,
  fields,
  columns,
  data = [],
  loading = false,
  error = "",
  searchFields = [],
  filters = [],
  customCanWrite,
  customCanDelete,
  preFilter = null,
  headerAction = null
}) {
  const { currentUser, userProfile } = useAuth();
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(() => getDefaultForm(fields));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const user = { uid: currentUser?.uid, email: currentUser?.email };
  const canWrite = typeof customCanWrite === "boolean" ? customCanWrite : canManageRecords(userProfile);
  const canRemove = typeof customCanDelete === "boolean" ? customCanDelete : canDeleteRecords(userProfile);

  const filteredData = useMemo(() => {
    let rows = preFilter ? data.filter(preFilter) : data;
    if (search.trim()) {
      const term = search.toLowerCase();
      rows = rows.filter((row) => searchFields.some((field) => String(row[field] || "").toLowerCase().includes(term)));
    }
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) rows = rows.filter((row) => String(row[key] || "") === String(value));
    });
    return rows;
  }, [data, filterValues, preFilter, search, searchFields]);

  function openCreate() {
    setEditingRecord(null);
    setForm(getDefaultForm(fields));
    setModalOpen(true);
  }

  function openEdit(record) {
    setEditingRecord(record);
    const next = getDefaultForm(fields);
    fields.forEach((field) => {
      next[field.name] = record[field.name] ?? "";
    });
    setForm(next);
    setModalOpen(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = normalizeData(fields, form);
      if (editingRecord?.id) {
        await updateRecord(collectionName, editingRecord.id, payload, user, `Updated ${title} record.`);
        setToast({ type: "success", message: `${title} updated successfully.` });
      } else {
        await createRecord(collectionName, payload, user, `Created ${title} record.`);
        setToast({ type: "success", message: `${title} created successfully.` });
      }
      setModalOpen(false);
      setEditingRecord(null);
      setForm(getDefaultForm(fields));
    } catch (err) {
      setToast({ type: "error", message: err.message || "Unable to save record." });
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget?.id) return;
    setSaving(true);
    try {
      await deleteRecord(collectionName, deleteTarget.id, user, `Deleted ${title} record.`);
      setToast({ type: "success", message: `${title} deleted successfully.` });
      setDeleteTarget(null);
    } catch (err) {
      setToast({ type: "error", message: err.message || "Unable to delete record." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">Operations</p>
          <h1 className="dashboard-section-title mt-2">{title}</h1>
          <p className="mt-2 max-w-4xl text-lg font-semibold text-slate-500">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {headerAction}
          {canWrite ? (
            <button type="button" onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-lg font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
              <Plus size={22} /> Add {title.replace(/s$/, "")}
            </button>
          ) : null}
        </div>
      </section>

      <section className="dashboard-card p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={22} className="text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${title.toLowerCase()}...`} className="w-full bg-transparent text-lg font-bold text-slate-800 outline-none placeholder:text-slate-400" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            {filters.map((filter) => (
              <select key={filter.name} value={filterValues[filter.name] || ""} onChange={(event) => setFilterValues((prev) => ({ ...prev, [filter.name]: event.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-black text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option value="">All {filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? option}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </section>

      {loading ? <LoadingSpinner label={`Loading ${title.toLowerCase()}...`} /> : null}
      {error ? <div className="rounded-3xl bg-red-50 p-5 text-lg font-black text-red-700">{error}</div> : null}
      {!loading && !error && filteredData.length === 0 ? (
        <EmptyState title={`No ${title.toLowerCase()} found`} message="Change your search/filter or create a new record when your role allows it." />
      ) : null}
      {!loading && !error && filteredData.length > 0 ? (
        <DataTable columns={columns} rows={filteredData} onEdit={openEdit} onDelete={setDeleteTarget} onView={setViewRecord} canEdit={canWrite} canDelete={canRemove} />
      ) : null}

      <Modal open={modalOpen} title={editingRecord ? `Edit ${title}` : `Add ${title}`} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className={field.type === "textarea" || field.fullWidth ? "md:col-span-2" : ""}>
              <FormInput {...field} value={form[field.name]} onChange={handleInputChange} />
            </div>
          ))}
          <div className="flex flex-col-reverse gap-3 md:col-span-2 md:flex-row md:justify-end">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-2xl border border-slate-200 px-6 py-3 text-lg font-black text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-2xl bg-blue-600 px-6 py-3 text-lg font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-60">
              {saving ? "Saving..." : "Save record"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={Boolean(viewRecord)} title="Record details" onClose={() => setViewRecord(null)}>
        <div className="grid gap-4 md:grid-cols-2">
          {columns.map((column) => (
            <div key={column.key} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-black uppercase tracking-wide text-slate-400">{column.label}</p>
              <div className="mt-2 text-lg font-black text-slate-800">{column.render ? column.render(viewRecord || {}) : viewRecord?.[column.key] || "—"}</div>
            </div>
          ))}
        </div>
      </Modal>

      <ConfirmDeleteModal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} loading={saving} message="Deleting this record will also be saved in audit logs." />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default CrudPage;
