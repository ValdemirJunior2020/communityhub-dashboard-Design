import React from 'react';

const PaymentBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full inline-block";
    const statusMap = {
        Paid: "bg-emerald-100 text-brand-success",
        Overdue: "bg-red-100 text-brand-error"
    };
    return <span className={`${baseClasses} ${statusMap[status]}`}>{status}</span>;
};

const RentTracker = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col space-y-6">
            <h3 className="text-xl font-bold text-neutral-900">Rent Payment Tracker</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-neutral-800">
                    <thead className="border-b-2 border-neutral-200">
                        <tr>
                            <th className="py-3 px-1 font-semibold">Tenant Name</th>
                            <th className="py-3 px-1 font-semibold">Unit Number</th>
                            <th className="py-3 px-1 font-semibold">Payment Status</th>
                            <th className="py-3 px-1 font-semibold">Amount Due</th>
                            <th className="py-3 px-1 font-semibold">Due Date</th>
                            <th className="py-3 px-1 font-semibold">Payment Method</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        <tr className="hover:bg-neutral-50">
                            <td className="py-4 px-1 text-sm font-medium">Tenant Name</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">001</td>
                            <td className="py-4 px-1 text-sm"><PaymentBadge status="Paid" /></td>
                            <td className="py-4 px-1 text-sm text-neutral-600">$120.00</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">07/07/2023</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">Open</td>
                        </tr>
                        <tr className="hover:bg-neutral-50">
                            <td className="py-4 px-1 text-sm font-medium">Tenant Name</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">031</td>
                            <td className="py-4 px-1 text-sm"><PaymentBadge status="Overdue" /></td>
                            <td className="py-4 px-1 text-sm text-neutral-600">$120.00</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">07/07/2023</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">Payment</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RentTracker;