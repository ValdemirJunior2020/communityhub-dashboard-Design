// src/components/Toast.jsx
import React from "react";

function Toast({ toast, onClose }) {
  if (!toast) return null;

  const styles = toast.type === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800";

  return (
    <div className={`fixed bottom-5 right-5 z-[60] max-w-md rounded-2xl border px-5 py-4 text-base font-black shadow-xl ${styles}`}>
      <div className="flex items-start gap-4">
        <span>{toast.message}</span>
        <button type="button" onClick={onClose} className="font-black opacity-70 hover:opacity-100">×</button>
      </div>
    </div>
  );
}

export default Toast;
