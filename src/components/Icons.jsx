// src/components/Icons.jsx
import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileBarChart,
  FileText,
  Home,
  LayoutDashboard,
  ListChecks,
  Search,
  Settings,
  UserRound,
  UsersRound,
  WalletCards,
  Wrench,
} from 'lucide-react';

const iconClass = 'h-8 w-8 shrink-0';
const sidebarClass = 'h-8 w-8 shrink-0';

export const IconBell = () => <Bell className={`${iconClass} text-slate-600`} />;
export const IconSearch = () => <Search className="h-8 w-8 text-slate-400" />;
export const IconArrowDown = () => <ChevronDown className="ml-1 h-7 w-7 text-slate-600" />;
export const IconArrowRight = () => <ChevronRight className="h-7 w-7 text-slate-500" />;

export const IconDashboard = () => <LayoutDashboard className={`${sidebarClass} text-blue-600`} />;
export const IconProperties = () => <Home className={`${sidebarClass} text-slate-700`} />;
export const IconUnits = () => <Building2 className={`${sidebarClass} text-slate-700`} />;
export const IconTenants = () => <UsersRound className={`${sidebarClass} text-slate-700`} />;
export const IconRent = () => <WalletCards className={`${sidebarClass} text-slate-700`} />;
export const IconMaintenance = () => <Wrench className={`${sidebarClass} text-slate-700`} />;
export const IconWorkOrders = () => <ClipboardCheck className={`${sidebarClass} text-slate-700`} />;
export const IconInspections = () => <ListChecks className={`${sidebarClass} text-slate-700`} />;
export const IconOwners = () => <UserRound className={`${sidebarClass} text-slate-700`} />;
export const IconVendors = () => <Wrench className={`${sidebarClass} text-slate-700`} />;
export const IconDocuments = () => <FileText className={`${sidebarClass} text-slate-700`} />;
export const IconReports = () => <FileBarChart className={`${sidebarClass} text-slate-700`} />;
export const IconSettings = () => <Settings className={`${sidebarClass} text-slate-700`} />;

export const IconHomeLine = () => <Home className={`${iconClass} text-blue-600`} />;
export const IconCheckCircle = () => <ClipboardCheck className={`${iconClass} text-emerald-600`} />;
export const IconMoneyBag = () => <WalletCards className={`${iconClass} text-amber-600`} />;
export const IconWrench = () => <Wrench className={`${iconClass} text-orange-600`} />;
export const IconExclamationTriangle = () => <AlertTriangle className={`${iconClass} text-red-600`} />;
export const IconClipboard = () => <ClipboardCheck className={`${iconClass} text-blue-600`} />;

export const IconExclamationCircle = () => <AlertCircle className={`${iconClass} text-red-600`} />;
export const IconCalendar = () => <CalendarDays className={`${iconClass} text-teal-600`} />;
export const IconRobotHead = () => <Bot className={`${iconClass} text-blue-600`} />;