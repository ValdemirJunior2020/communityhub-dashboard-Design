import React from 'react';

// Heroicons - Outline
export const IconBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7a6.75 6.75 0 00-13.5 0v.7c0 2.176-.707 4.21-2.023 5.892a1.053 1.053 0 00.146 1.307 23.83 23.83 0 005.454 1.311M9.457 19.462a3 3 0 006.085 0" />
  </svg>
);

export const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const IconArrowDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 ml-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 ml-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// Sidebar Icons - simplified versions for now
export const IconDashboard = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-brand-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 6h16.5" />
    </svg>
);
export const IconProperties = () => <div className="w-6 h-6 mr-3 text-neutral-600">🏠</div>;
export const IconUnits = () => <div className="w-6 h-6 mr-3 text-neutral-600">🏢</div>;
export const IconTenants = () => <div className="w-6 h-6 mr-3 text-neutral-600">👥</div>;
export const IconRent = () => <div className="w-6 h-6 mr-3 text-neutral-600">💰</div>;
export const IconMaintenance = () => <div className="w-6 h-6 mr-3 text-neutral-600">🔧</div>;
export const IconWorkOrders = () => <div className="w-6 h-6 mr-3 text-neutral-600">📋</div>;
export const IconInspections = () => <div className="w-6 h-6 mr-3 text-neutral-600">🔍</div>;
export const IconOwners = () => <div className="w-6 h-6 mr-3 text-neutral-600">👑</div>;
export const IconVendors = () => <div className="w-6 h-6 mr-3 text-neutral-600">🛠️</div>;
export const IconDocuments = () => <div className="w-6 h-6 mr-3 text-neutral-600">📄</div>;
export const IconReports = () => <div className="w-6 h-6 mr-3 text-neutral-600">📊</div>;
export const IconSettings = () => <div className="w-6 h-6 mr-3 text-neutral-600">⚙️</div>;

// KPI Icons
export const IconHomeLine = () => <div className="w-6 h-6 text-brand-primary">🏠</div>;
export const IconCheckCircle = () => <div className="w-6 h-6 text-brand-success">✅</div>;
export const IconMoneyBag = () => <div className="w-6 h-6 text-brand-success">💰</div>;
export const IconWrench = () => <div className="w-6 h-6 text-brand-primary">🔧</div>;
export const IconExclamationTriangle = () => <div className="w-6 h-6 text-brand-error">⚠️</div>;
export const IconClipboard = () => <div className="w-6 h-6 text-brand-primary">📋</div>;

// Alert Icons
export const IconExclamationCircle = () => <div className="w-6 h-6 text-brand-error">⚠️</div>;
export const IconCalendar = () => <div className="w-6 h-6 text-brand-success">📅</div>;

// AI Assistant Icon
export const IconRobotHead = () => <div className="w-6 h-6 text-brand-primary">🤖</div>;