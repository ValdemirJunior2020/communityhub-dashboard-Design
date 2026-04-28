// src/components/EmptyState.jsx
import React from "react";
import { Inbox } from "lucide-react";

function EmptyState({ title = "Nothing here yet", message = "Create your first record to get started.", action = null }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
        <Inbox size={34} />
      </div>
      <h3 className="mt-5 text-2xl font-black text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-2xl text-base font-semibold text-slate-500 sm:text-lg">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export default EmptyState;
