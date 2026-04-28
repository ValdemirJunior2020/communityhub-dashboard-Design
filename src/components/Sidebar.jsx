// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\components\Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { canManageUsers } from "../utils/permissions";

const staffMenuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", path: "/properties", icon: Home },
  { label: "Units", path: "/units", icon: Building2 },
  { label: "Tenants", path: "/tenants", icon: Users },
  { label: "Rent Payments", path: "/rent-payments", icon: DollarSign },
  { label: "Maintenance", path: "/maintenance", icon: Wrench },
  { label: "Work Orders", path: "/work-orders", icon: ClipboardList },
  { label: "Inspections", path: "/inspections", icon: ClipboardCheck },
  { label: "Owners", path: "/owners", icon: Users },
  { label: "Vendors", path: "/vendors", icon: Truck },
  { label: "Documents", path: "/documents", icon: FileText },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

const tenantMenuItems = [
  { label: "Tenant Portal", path: "/tenant-portal", icon: CreditCard },
  { label: "Receipts", path: "/tenant-portal", icon: FileText },
  { label: "Maintenance", path: "/tenant-portal", icon: Wrench },
];

function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const { userProfile } = useAuth();

  const isTenant = userProfile?.role === "tenant";

  let finalMenuItems = isTenant ? tenantMenuItems : staffMenuItems;

  if (!isTenant && canManageUsers(userProfile)) {
    finalMenuItems = [
      ...staffMenuItems,
      { label: "Admin Users", path: "/admin-users", icon: ShieldCheck },
    ];
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] max-w-[86vw] shrink-0 flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-[260px] lg:translate-x-0 lg:shadow-none xl:w-[280px] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 pb-4 pt-5">
          <NavLink
            to={isTenant ? "/tenant-portal" : "/dashboard"}
            onClick={onClose}
            className="block"
          >
            <img
              src={logo}
              alt="Community Hub"
              className="h-auto w-full max-w-[210px] object-contain"
            />
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 p-2 text-slate-700 lg:hidden"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-5">
          <div className="space-y-1.5">
            {finalMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={`${item.label}-${item.path}`}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-black transition xl:text-lg ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                        : "text-slate-800 hover:bg-slate-50 hover:text-slate-950"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? "text-blue-600" : "text-slate-700"}>
                        <Icon size={24} strokeWidth={2.4} />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;