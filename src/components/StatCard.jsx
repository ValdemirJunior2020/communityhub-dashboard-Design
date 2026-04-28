// src/components/StatCard.jsx
import React from "react";

function StatCard({ title, value, subtitle, icon: Icon, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
    red: "bg-red-50 text-red-700",
    slate: "bg-slate-100 text-slate-700",
    purple: "bg-violet-50 text-violet-700"
  };

  return (
    <div className="dashboard-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{value}</p>
          {subtitle ? <p className="mt-2 text-base font-bold text-slate-500">{subtitle}</p> : null}
        </div>
        {Icon ? (
          <div className={`rounded-3xl p-3 ${tones[tone] || tones.blue}`}>
            <Icon size={28} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default StatCard;
