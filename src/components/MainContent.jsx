import React from 'react';
import KpiCard from './KpiCard';
import TrendChart from './TrendChart';
import PropertyGrid from './PropertyGrid';
import MaintenanceCenter from './MaintenanceCenter';
import RentTracker from './RentTracker';
import SmartAlerts from './SmartAlerts';
import AiAssistant from './AiAssistant';
import { IconHomeLine, IconCheckCircle, IconMoneyBag, IconWrench, IconExclamationTriangle, IconClipboard } from './Icons';

const MainContent = () => {
    // KPI Data - hardcoded from the image
    const kpiData = [
        { icon: <IconHomeLine />, title: "Total Properties", value: "15" },
        { icon: <IconCheckCircle />, title: "Occupied Units", value: "412 Units", percentage: 94 },
        { icon: <IconMoneyBag />, title: "Monthly Rent Collected", value: "$845,750", subtext: "Target: 98%" },
        { icon: <IconWrench />, title: "Pending Maintenance", value: "23 Requests" },
        { icon: <IconExclamationTriangle />, title: "Overdue Payments", value: "8 Tenants", subtext: "$12,500" },
        { icon: <IconClipboard />, title: "Open Work Orders", value: "11 Active" },
    ];

    return (
        <div className="space-y-8">
            {/* KPI Cards Grid */}
            <section className="grid grid-cols-6 gap-6">
                {kpiData.map((kpi, index) => (
                    <KpiCard key={index} {...kpi} />
                ))}
            </section>

            {/* Trends Chart & Property Grid Section */}
            <section className="grid grid-cols-2 gap-8">
                <TrendChart />
                <PropertyGrid />
            </section>

            {/* Tables & Alerts Section */}
            <section className="grid grid-cols-[3fr,1.3fr] gap-8">
                {/* Column 1 - Tables */}
                <div className="space-y-8">
                    <MaintenanceCenter />
                    <RentTracker />
                </div>
                {/* Column 2 - Panels */}
                <div className="space-y-8">
                    <SmartAlerts />
                    <AiAssistant />
                </div>
            </section>
        </div>
    );
};

export default MainContent;