// src/components/Modal.jsx
import React from "react";
import { X } from "lucide-react";

function Modal({ open, title, children, onClose, size = "max-w-4xl" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className={`max-h-[92vh] w-full overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem] ${size}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
          <h2 className="text-2xl font-black text-slate-950">{title}</h2>
          <button onClick={onClose} className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200" type="button">
            <X size={24} />
          </button>
        </div>
        <div className="max-h-[calc(92vh-84px)] overflow-y-auto p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
