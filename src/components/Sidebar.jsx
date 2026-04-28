// src/components/Sidebar.jsx
import React, { useState } from 'react';
import {
  IconDashboard,
  IconProperties,
  IconUnits,
  IconTenants,
  IconRent,
  IconMaintenance,
  IconWorkOrders,
  IconInspections,
  IconOwners,
  IconVendors,
  IconDocuments,
  IconReports,
  IconSettings,
} from './Icons';

const Logo = () => (
  <div className="mb-9 flex items-center gap-4 px-2">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-md">
      <span className="text-4xl font-black leading-none">P</span>
    </div>
    <div className="leading-tight">
      <p className="text-3xl font-black tracking-tight text-slate-900">Propel</p>
      <p className="text-3xl font-black tracking-tight text-slate-900">Properties</p>
    </div>
  </div>
);

const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-5 rounded-2xl px-5 py-5 text-left text-2xl font-black transition ${
      isActive
        ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
    }`}
  >
    <span className={isActive ? 'text-blue-600' : 'text-slate-600'}>{icon}</span>
    <span>{label}</span>
  </button>
);

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: <IconDashboard />, label: 'Dashboard' },
    { icon: <IconProperties />, label: 'Properties' },
    { icon: <IconUnits />, label: 'Units' },
    { icon: <IconTenants />, label: 'Tenants' },
    { icon: <IconRent />, label: 'Rent Payments' },
    { icon: <IconMaintenance />, label: 'Maintenance' },
    { icon: <IconWorkOrders />, label: 'Work Orders' },
    { icon: <IconInspections />, label: 'Inspections' },
    { icon: <IconOwners />, label: 'Owners' },
    { icon: <IconVendors />, label: 'Vendors' },
    { icon: <IconDocuments />, label: 'Documents' },
    { icon: <IconReports />, label: 'Reports' },
    { icon: <IconSettings />, label: 'Settings' },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-[340px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-6 py-8 lg:block">
      <Logo />
      <nav className="space-y-3">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;