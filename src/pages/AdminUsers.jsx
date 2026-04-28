// src/pages/AdminUsers.jsx
import React, { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import DataTable from "../components/DataTable";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { useCollection } from "../hooks/useCollection";
import { formatDateTime } from "../services/firestoreService";
import { writeAuditLog } from "../services/auditService";
import { ROLES, USER_STATUSES, roleLabels } from "../utils/permissions";

function AdminUsers() {
  const { currentUser } = useAuth();
  const users = useCollection("users");
  const [toast, setToast] = useState(null);
  const [savingId, setSavingId] = useState("");

  async function updateUser(userId, changes) {
    setSavingId(userId);
    try {
      await updateDoc(doc(db, "users", userId), { ...changes, updatedAt: serverTimestamp() });
      await writeAuditLog({
        action: "updateUser",
        collectionName: "users",
        documentId: userId,
        user: { uid: currentUser?.uid, email: currentUser?.email },
        description: `Updated user permissions: ${Object.keys(changes).join(", ")}`
      });
      setToast({ type: "success", message: "User updated." });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Unable to update user." });
    } finally {
      setSavingId("");
    }
  }

  if (users.loading) return <LoadingSpinner label="Loading users..." />;

  const rows = users.data.map((user) => ({
    ...user,
    displayRole: roleLabels[user.role] || user.role || "Viewer",
    created: formatDateTime(user.createdAt),
    lastLogin: formatDateTime(user.lastLoginAt),
    roleControl: (
      <select disabled={savingId === user.id} value={user.role || "viewer"} onChange={(event) => updateUser(user.id, { role: event.target.value })} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-base font-black text-slate-700">
        {ROLES.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}
      </select>
    ),
    statusControl: (
      <select disabled={savingId === user.id} value={user.status || "active"} onChange={(event) => updateUser(user.id, { status: event.target.value })} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-base font-black text-slate-700">
        {USER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    )
  }));

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">Admin center</p>
        <h1 className="dashboard-section-title mt-2">Admin Users</h1>
        <p className="mt-2 max-w-4xl text-lg font-semibold text-slate-500">View users, change roles, activate or deactivate accounts, and review creation/last-login information.</p>
      </section>

      {users.error ? <div className="rounded-3xl bg-red-50 p-5 text-lg font-black text-red-700">{users.error}</div> : null}

      <DataTable
        rows={rows}
        columns={[
          { key: "fullName", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "roleControl", label: "Role", render: (row) => row.roleControl },
          { key: "status", label: "Status", render: (row) => <StatusBadge value={row.status} /> },
          { key: "statusControl", label: "Change Status", render: (row) => row.statusControl },
          { key: "created", label: "Created" },
          { key: "lastLogin", label: "Last Login" }
        ]}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default AdminUsers;
