// src/components/StatusBadge.jsx
import React from "react";

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  occupied: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  passed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  available: "bg-blue-50 text-blue-700 ring-blue-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  partial: "bg-amber-50 text-amber-700 ring-amber-200",
  reserved: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  scheduled: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  inProgress: "bg-violet-50 text-violet-700 ring-violet-200",
  maintenance: "bg-orange-50 text-orange-700 ring-orange-200",
  open: "bg-orange-50 text-orange-700 ring-orange-200",
  overdue: "bg-red-50 text-red-700 ring-red-200",
  high: "bg-red-50 text-red-700 ring-red-200",
  emergency: "bg-red-50 text-red-700 ring-red-200",
  inactive: "bg-slate-100 text-slate-600 ring-slate-200",
  cancelled: "bg-slate-100 text-slate-600 ring-slate-200",
  low: "bg-slate-100 text-slate-700 ring-slate-200",
  medium: "bg-blue-50 text-blue-700 ring-blue-200"
};

function labelize(value) {
  if (!value) return "—";
  return String(value)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function StatusBadge({ value }) {
  const key = value || "inactive";
  const style = statusStyles[key] || "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-sm font-black ring-1 ${style}`}>
      {labelize(value)}
    </span>
  );
}

export default StatusBadge;
