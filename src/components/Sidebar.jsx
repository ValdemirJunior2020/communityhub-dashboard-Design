import React, { useState } from 'react';
import { IconDashboard, IconProperties, IconUnits, IconTenants, IconRent, IconMaintenance, IconWorkOrders, IconInspections, IconOwners, IconVendors, IconDocuments, IconReports, IconSettings } from './Icons';

// Use placeholders for now
const PlaceHolderLogo = () => (
    <div className="flex items-center mb-10 space-x-3">
        <div className="w-12 h-12 rounded-lg bg-white p-2 border border-neutral-200 shadow-sm flex items-center justify-center">
            <div className="w-full h-full text-brand-primary">🏢</div>
        </div>
        <div className="flex flex-col">
            <span className="text-2xl font-bold text-neutral-900">Propel</span>
            <span className="text-neutral-600 -mt-1">Properties</span>
        </div>
    </div>
);

// Added onClick prop to handle the click event
const SidebarItem = ({ icon, label, isActive, onClick }) => {
  const baseClasses = "flex items-center p-3 rounded-lg text-lg font-medium transition duration-150 cursor-pointer";
  const activeClasses = "bg-sky-100 text-brand-primary";
  const inactiveClasses = "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900";

  return (
    <div 
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        onClick={onClick}
    >
      {icon}
      {label}
    </div>
  );
};

const Sidebar = () => {
    // Now we will actually use setActiveIndex!
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        { icon: <IconDashboard />, label: "Dashboard" },
        { icon: <IconProperties />, label: "Properties" },
        { icon: <IconUnits />, label: "Units" },
        { icon: <IconTenants />, label: "Tenants" },
        { icon: <IconRent />, label: "Rent Payments" },
        { icon: <IconMaintenance />, label: "Maintenance" },
        { icon: <IconWorkOrders />, label: "Work Orders" },
        { icon: <IconInspections />, label: "Inspections" },
        { icon: <IconOwners />, label: "Owners" },
        { icon: <IconVendors />, label: "Vendors" },
        { icon: <IconDocuments />, label: "Documents" },
        { icon: <IconReports />, label: "Reports" },
        { icon: <IconSettings />, label: "Settings" },
    ];

    return (
        <aside className="w-72 bg-white border-r border-neutral-200 px-8 py-6 h-screen sticky top-0 overflow-y-auto hidden md:block">
            <PlaceHolderLogo />
            <nav className="space-y-1">
                {menuItems.map((item, index) => (
                    <SidebarItem 
                        key={item.label} 
                        icon={item.icon} 
                        label={item.label} 
                        isActive={index === activeIndex} 
                        onClick={() => setActiveIndex(index)} // Updates the active item on click
                    />
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;