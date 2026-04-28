import React from 'react';

const KpiCard = ({ icon, title, value, percentage, subtext }) => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                    {icon}
                </div>
                {percentage !== undefined && (
                    <span className="inline-block bg-emerald-100 text-brand-success text-sm font-bold px-3 py-1 rounded-full">
                        {percentage}%
                    </span>
                )}
            </div>
            
            <div>
                <span className="text-neutral-600 font-medium mb-1">{title}</span>
                <p className="text-4xl font-extrabold text-neutral-900">{value}</p>
                {subtext && (
                    <span className="text-sm text-neutral-600 mt-1">{subtext}</span>
                )}
            </div>
        </div>
    );
};

export default KpiCard;