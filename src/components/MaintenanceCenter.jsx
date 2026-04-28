// src/components/MaintenanceCenter.jsx
import React from 'react';

const Badge = ({ variant, children }) => {
  const variants = {
    high: 'bg-red-100 text-red-700 ring-red-300',
    progress: 'bg-orange-100 text-orange-700 ring-orange-300',
    completed: 'bg-emerald-100 text-emerald-700 ring-emerald-300',
  };

  return (
    <span
      className={`inline-flex rounded-full px-5 py-2 text-[22px] font-black ring-2 ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

const MaintenanceCenter = () => {
  return (
    <div className="dashboard-card p-8">
      <h3 className="mb-7 text-[34px] font-black leading-tight text-slate-950">
        Maintenance Center
      </h3>

      <div className="overflow-x-auto rounded-3xl border-2 border-slate-200">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50">
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Tenant Name</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Property</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Issue Type</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Priority</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Status</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Assigned Vendor</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Due Date</th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-slate-100 bg-white">
            <tr className="hover:bg-slate-50">
              <td className="px-7 py-6 text-[24px] font-black text-slate-900">Tenant Name</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">123 Main St ...</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">Issue Priority</td>
              <td className="px-7 py-6"><Badge variant="high">High Priority</Badge></td>
              <td className="px-7 py-6"><Badge variant="progress">In Progress</Badge></td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">Apex Plumbing</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">02/01/2023</td>
            </tr>

            <tr className="hover:bg-slate-50">
              <td className="px-7 py-6 text-[24px] font-black text-slate-900">Tenant Name</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">The Heights ...</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">High Priority</td>
              <td className="px-7 py-6"><Badge variant="high">High Priority</Badge></td>
              <td className="px-7 py-6"><Badge variant="completed">Completed</Badge></td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">Assign Vendor</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">02/01/2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceCenter;