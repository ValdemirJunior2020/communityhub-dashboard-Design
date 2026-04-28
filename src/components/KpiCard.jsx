// src/components/KpiCard.jsx
import React from 'react';

const KpiCard = ({ icon, title, value, percentage, subtext }) => {
  return (
    <div className="dashboard-card flex min-h-[150px] flex-col justify-between p-7 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 ring-1 ring-blue-100">
          {icon}
        </div>

        {percentage !== undefined && (
          <span className="rounded-full bg-emerald-50 px-4 py-2 text-xl font-black text-emerald-700 ring-1 ring-emerald-200">
            {percentage}%
          </span>
        )}
      </div>

      <div>
        <p className="mb-2 text-2xl font-black leading-tight text-slate-800">{title}</p>
        <p className="text-4xl font-black leading-tight tracking-tight text-slate-950">{value}</p>
        {subtext && <p className="mt-2 text-2xl font-black text-slate-700">{subtext}</p>}
      </div>
    </div>
  );
};

export default KpiCard;