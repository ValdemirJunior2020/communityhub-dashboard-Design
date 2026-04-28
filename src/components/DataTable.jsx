// src/components/DataTable.jsx
import React from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

function renderValue(column, row) {
  if (column.render) return column.render(row);
  const value = row[column.key];
  if (column.type === "status") return <StatusBadge value={value} />;
  if (column.type === "currency") {
    const number = Number(value || 0);
    return number.toLocaleString(undefined, { style: "currency", currency: "USD" });
  }
  if (column.type === "date") return value === 0 ? 0 : value || "—";
  return value === 0 ? 0 : value || "—";
}

function DataTable({ columns, rows, onEdit, onDelete, onView, canEdit = false, canDelete = false, emptyMessage = "No records found." }) {
  if (!rows.length) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-lg font-bold text-slate-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="dashboard-table min-w-full divide-y divide-slate-100">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="text-left">
                  {column.label}
                </th>
              ))}
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className="align-middle">
                    {renderValue(column, row)}
                  </td>
                ))}
                <td className="text-right align-middle">
                  <div className="flex justify-end gap-2">
                    {onView ? (
                      <button type="button" onClick={() => onView(row)} className="rounded-xl bg-blue-50 p-2 text-blue-700 hover:bg-blue-100" title="View">
                        <Eye size={20} />
                      </button>
                    ) : null}
                    {canEdit ? (
                      <button type="button" onClick={() => onEdit(row)} className="rounded-xl bg-slate-100 p-2 text-slate-700 hover:bg-slate-200" title="Edit">
                        <Edit size={20} />
                      </button>
                    ) : null}
                    {canDelete ? (
                      <button type="button" onClick={() => onDelete(row)} className="rounded-xl bg-red-50 p-2 text-red-700 hover:bg-red-100" title="Delete">
                        <Trash2 size={20} />
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
