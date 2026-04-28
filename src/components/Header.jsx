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
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl sm:px-5 lg:px-6 xl:px-7">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl bg-slate-100 p-2 text-slate-800 transition hover:bg-slate-200 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <h1 className="truncate text-2xl font-black tracking-tight text-slate-950 sm:text-3xl xl:text-4xl">
            {pageTitle}
          </h1>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="relative hidden w-full max-w-[24rem] lg:block xl:max-w-[30rem]">
            <input
              type="text"
              placeholder="Search..."
              className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base font-bold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <Search
              size={23}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <button
            type="button"
            className="relative rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={25} />
            <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-black text-white ring-2 ring-white">
              1
            </span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-2 text-sm font-black shadow-sm transition hover:bg-slate-50 sm:px-3"
            title={displayName}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">
              {initials}
            </span>
            <ChevronDown size={20} className="hidden text-slate-700 sm:block" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="hidden h-12 items-center gap-2 rounded-2xl bg-emerald-500 px-4 text-base font-black text-white shadow-sm transition hover:bg-emerald-600 xl:flex"
          >
            Quick Action
            <ChevronDown size={20} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition hover:bg-slate-800"
            title="Logout"
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;