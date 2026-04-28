// C:\MyProjects\propel-properties-dashboard\src\components\MainContent.jsx
import React from 'react';
import KpiCard from './KpiCard';
import TrendChart from './TrendChart';
import PropertyGrid from './PropertyGrid';
import MaintenanceCenter from './MaintenanceCenter';
import RentTracker from './RentTracker';
import SmartAlerts from './SmartAlerts';
import AiAssistant from './AiAssistant';
import {
  IconHomeLine,
  IconCheckCircle,
  IconMoneyBag,
  IconWrench,
  IconExclamationTriangle,
  IconClipboard,
} from './Icons';

const MainContent = () => {
  const kpiData = [
    { icon: <IconHomeLine />, title: 'Total Properties', value: '15' },
    { icon: <IconCheckCircle />, title: 'Occupied Units', value: '412 Units', percentage: 94 },
    { icon: <IconMoneyBag />, title: 'Monthly Rent Collected', value: '$845,750', subtext: 'Target: 98%' },
    { icon: <IconWrench />, title: 'Pending Maintenance', value: '23 Requests' },
    { icon: <IconExclamationTriangle />, title: 'Overdue Payments', value: '8 Tenants', subtext: '$12,500' },
    { icon: <IconClipboard />, title: 'Open Work Orders', value: '11 Active' },
  ];

  return (
    <div className="w-full max-w-none space-y-6 md:space-y-8">
      <section className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-[1.05fr_1fr]">
        <TrendChart />
        <PropertyGrid />
      </section>

      <section className="grid w-full grid-cols-1 gap-6 2xl:grid-cols-[1.45fr_1fr]">
        <div className="space-y-6 md:space-y-8">
          <MaintenanceCenter />
          <RentTracker />
        </div>

        <div className="space-y-6 md:space-y-8">
          <SmartAlerts />
          <AiAssistant />
        </div>
      </section>
    </div>
  );
};

export default MainContent;