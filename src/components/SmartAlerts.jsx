// src/components/SmartAlerts.jsx
import React from 'react';
import { IconBell, IconExclamationCircle, IconExclamationTriangle, IconCalendar } from './Icons';

const AlertItem = ({ icon, text, tone = 'blue' }) => {
  const toneMap = {
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
    teal: 'bg-teal-100 text-teal-700',
  };

  return (
    <div className="flex min-h-[92px] items-center gap-6 rounded-3xl border-2 border-slate-200 bg-white p-6 transition hover:bg-slate-50">
      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${toneMap[tone]}`}>
        {icon}
      </div>

      <span className="text-[28px] font-black leading-snug text-slate-950">
        {text}
      </span>
    </div>
  );
};

const SmartAlerts = () => {
  return (
    <div className="dashboard-card p-8">
      <h3 className="mb-7 text-[34px] font-black leading-tight text-slate-950">
        Smart Alerts Panel
      </h3>

      <div className="space-y-5">
        <AlertItem icon={<IconBell />} text="5 Leases Expiring this Month" tone="red" />
        <AlertItem icon={<IconExclamationCircle />} text="3 High-Priority Maintenance Requests" tone="amber" />
        <AlertItem icon={<IconExclamationTriangle />} text="8 Overdue Rent Payments" tone="red" />
        <AlertItem icon={<IconCalendar />} text="Inspection Scheduled Tomorrow" tone="teal" />
      </div>
    </div>
  );
};

export default SmartAlerts;