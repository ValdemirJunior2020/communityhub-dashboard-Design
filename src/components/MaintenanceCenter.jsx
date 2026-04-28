import React from 'react';

const Badge = ({ variant, children }) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full inline-block";
    const variants = {
        high: "bg-red-100 text-brand-error",
        progress: "bg-orange-100 text-brand-warning",
        completed: "bg-emerald-100 text-brand-success"
    };
    return <span className={`${baseClasses} ${variants[variant]}`}>{children}</span>;
};

const MaintenanceCenter = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col space-y-6">
            <h3 className="text-xl font-bold text-neutral-900">Maintenance Center</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-neutral-800">
                    <thead className="border-b-2 border-neutral-200">
                        <tr>
                            <th className="py-3 px-1 font-semibold">Tenant Name</th>
                            <th className="py-3 px-1 font-semibold">Property</th>
                            <th className="py-3 px-1 font-semibold">Issue Type</th>
                            <th className="py-3 px-1 font-semibold">Priority</th>
                            <th className="py-3 px-1 font-semibold">Status</th>
                            <th className="py-3 px-1 font-semibold">Assigned Vendor</th>
                            <th className="py-3 px-1 font-semibold">Due Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        <tr className="hover:bg-neutral-50">
                            <td className="py-4 px-1 text-sm font-medium">Tenant Name</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">123 Main St...</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">Issue Priority</td>
                            <td className="py-4 px-1 text-sm"><Badge variant="high">High Priority</Badge></td>
                            <td className="py-4 px-1 text-sm"><Badge variant="progress">In Progress</Badge></td>
                            <td className="py-4 px-1 text-sm text-neutral-600">Apex Plumbing</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">02/01/2023</td>
                        </tr>
                        <tr className="hover:bg-neutral-50">
                            <td className="py-4 px-1 text-sm font-medium">Tenant Name</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">The Heights...</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">High Priority</td>
                            <td className="py-4 px-1 text-sm"><Badge variant="high">High Priority</Badge></td>
                            <td className="py-4 px-1 text-sm"><Badge variant="completed">Completed</Badge></td>
                            <td className="py-4 px-1 text-sm text-neutral-600">Assign Vendor</td>
                            <td className="py-4 px-1 text-sm text-neutral-600">02/01/2023</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MaintenanceCenter;