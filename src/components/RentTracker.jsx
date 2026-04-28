// src/components/RentTracker.jsx
import React from 'react';

const PaymentBadge = ({ status }) => {
  const statusMap = {
    Paid: 'bg-emerald-100 text-emerald-700 ring-emerald-300',
    Overdue: 'bg-red-100 text-red-700 ring-red-300',
  };

  return (
    <span className={`inline-flex rounded-full px-6 py-3 text-[28px] font-black ring-2 ${statusMap[status]}`}>
      {status}
    </span>
  );
};

const RentTracker = () => {
  return (
    <div className="dashboard-card p-10">
      <h3 className="mb-8 text-[44px] font-black leading-tight text-slate-950">
        Rent Payment Tracker
      </h3>

      <div className="overflow-x-auto rounded-[32px] border-2 border-slate-200">
        <table className="w-full min-w-[1400px] table-auto text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50">
              <th className="px-9 py-7 text-[31px] font-black text-slate-950">Tenant Name</th>
              <th className="px-9 py-7 text-[31px] font-black text-slate-950">Unit Number</th>
              <th className="px-9 py-7 text-[31px] font-black text-slate-950">Payment Status</th>
              <th className="px-9 py-7 text-[31px] font-black text-slate-950">Amount Due</th>
              <th className="px-9 py-7 text-[31px] font-black text-slate-950">Due Date</th>
              <th className="px-9 py-7 text-[31px] font-black text-slate-950">Payment Method</th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-slate-100 bg-white">
            <tr className="hover:bg-slate-50">
              <td className="px-9 py-8 text-[31px] font-black text-slate-900">Tenant Name</td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">001</td>
              <td className="px-9 py-8"><PaymentBadge status="Paid" /></td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">$120.00</td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">07/07/2023</td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">Open</td>
            </tr>

            <tr className="hover:bg-slate-50">
              <td className="px-9 py-8 text-[31px] font-black text-slate-900">Tenant Name</td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">031</td>
              <td className="px-9 py-8"><PaymentBadge status="Overdue" /></td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">$120.00</td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">07/07/2023</td>
              <td className="px-9 py-8 text-[30px] font-bold text-slate-700">Payment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentTracker;