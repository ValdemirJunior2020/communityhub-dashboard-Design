// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\components\Header.jsx
import React from "react";
import { Bell, ChevronDown, LogOut, Menu, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/properties": "Properties",
  "/units": "Units",
  "/tenants": "Tenants",
  "/rent-payments": "Rent Payments",
  "/maintenance": "Maintenance",
  "/work-orders": "Work Orders",
  "/inspections": "Inspections",
  "/owners": "Owners",
  "/vendors": "Vendors",
  "/documents": "Documents",
  "/reports": "Reports",
  "/settings": "Settings",
  "/admin-users": "Admin Users",
  "/tenant-portal": "Tenant Portal",
  "/payment-success": "Payment Success",
  "/payment-cancel": "Payment Cancelled",
};

function getInitials(nameOrEmail) {
  if (!nameOrEmail) return "U";

  const cleanName = nameOrEmail.includes("@")
    ? nameOrEmail.split("@")[0]
    : nameOrEmail;

  return cleanName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Header({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();

  const pageTitle = pageTitles[location.pathname] || "Dashboard";
  const displayName =
    userProfile?.fullName ||
    currentUser?.displayName ||
    currentUser?.email ||
    "Admin";

  const initials = getInitials(displayName);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl bg-slate-100 p-2 text-slate-800 transition hover:bg-slate-200 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <h1 className="truncate text-2xl font-black tracking-tight text-slate-950 lg:text-3xl">
            {pageTitle}
          </h1>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <div className="relative hidden w-full max-w-[22rem] lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm font-bold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <button
            type="button"
            className="relative rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={23} />
            <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
              1
            </span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-sm font-black shadow-sm transition hover:bg-slate-50"
            title={displayName}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">
              {initials}
            </span>
            <ChevronDown size={18} className="hidden text-slate-700 sm:block" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="hidden h-11 items-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-black text-white shadow-sm transition hover:bg-emerald-600 xl:flex"
          >
            Quick Action
            <ChevronDown size={18} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;