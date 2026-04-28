import React from 'react';
import { IconBell, IconExclamationCircle, IconExclamationTriangle, IconCalendar } from './Icons';

const AlertItem = ({ icon, text, textClasses }) => (
    <div className="flex items-center p-5 rounded-2xl bg-white hover:bg-neutral-50">
        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mr-5">
            {icon}
        </div>
        <span className={`text-lg font-medium text-neutral-900 flex-1 ${textClasses}`}>{text}</span>
    </div>
);

const SmartAlerts = () => {
    return (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col space-y-6">
            <h3 className="text-xl font-bold text-neutral-900">Smart Alerts Panel</h3>
            <div className="space-y-4">
                <AlertItem icon={<IconBell />} text="5 Leases Expiring this Month" />
                <AlertItem icon={<IconExclamationCircle />} text="3 High-Priority Maintenance Requests" />
                <AlertItem icon={<IconExclamationTriangle />} text="8 Overdue Rent Payments" textClasses="text-brand-error" />
                <AlertItem icon={<IconCalendar />} text="Inspection Scheduled Tomorrow" />
            </div>
        </div>
    );
};

export default SmartAlerts;