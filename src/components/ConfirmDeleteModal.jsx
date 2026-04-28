// src/components/ConfirmDeleteModal.jsx
import React from "react";
import Modal from "./Modal";

function ConfirmDeleteModal({ open, title = "Delete record", message, onClose, onConfirm, loading = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="max-w-xl">
      <p className="text-lg font-semibold text-slate-600">{message || "This action cannot be undone."}</p>
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-5 py-3 text-base font-black text-slate-700 hover:bg-slate-50">
          Cancel
        </button>
        <button type="button" onClick={onConfirm} disabled={loading} className="rounded-2xl bg-red-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-red-200 hover:bg-red-700 disabled:opacity-60">
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
