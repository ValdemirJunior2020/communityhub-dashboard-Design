// src/components/RentTracker.jsx
import React from 'react';

const PaymentBadge = ({ status }) => {
  const statusMap = {
    Paid: 'bg-emerald-100 text-emerald-700 ring-emerald-300',
    Overdue: 'bg-red-100 text-red-700 ring-red-300',
  };

  return (
    <span
      className={`inline-flex rounded-full px-5 py-2 text-[22px] font-black ring-2 ${statusMap[status]}`}
    >
      {status}
    </span>
  );
};

const RentTracker = () => {
  return (
    <div className="dashboard-card p-8">
      <h3 className="mb-7 text-[34px] font-black leading-tight text-slate-950">
        Rent Payment Tracker
      </h3>

      <div className="overflow-x-auto rounded-3xl border-2 border-slate-200">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50">
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Tenant Name</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Unit Number</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Payment Status</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Amount Due</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Due Date</th>
              <th className="px-7 py-5 text-[24px] font-black text-slate-950">Payment Method</th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-slate-100 bg-white">
            <tr className="hover:bg-slate-50">
              <td className="px-7 py-6 text-[24px] font-black text-slate-900">Tenant Name</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">001</td>
              <td className="px-7 py-6"><PaymentBadge status="Paid" /></td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">$120.00</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">07/07/2023</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">Open</td>
            </tr>

            <tr className="hover:bg-slate-50">
              <td className="px-7 py-6 text-[24px] font-black text-slate-900">Tenant Name</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">031</td>
              <td className="px-7 py-6"><PaymentBadge status="Overdue" /></td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">$120.00</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">07/07/2023</td>
              <td className="px-7 py-6 text-[23px] font-bold text-slate-700">Payment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentTracker;