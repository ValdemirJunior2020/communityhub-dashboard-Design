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
  const displayName = userProfile?.fullName || currentUser?.displayName || currentUser?.email || "Admin";
  const initials = getInitials(displayName);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-8 xl:px-10">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-2xl bg-slate-100 p-3 text-slate-800 transition hover:bg-slate-200 lg:hidden"
          >
            <Menu size={28} />
          </button>

          <h1 className="shrink-0 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {pageTitle}
          </h1>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 xl:flex-row xl:items-center xl:justify-end">
          <div className="relative w-full xl:max-w-[36rem]">
            <input
              type="text"
              placeholder="Search..."
              className="h-16 w-full rounded-2xl border border-slate-300 bg-white pl-14 pr-5 text-xl font-bold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <Search
              size={30}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <button
              type="button"
              className="relative rounded-full p-3 text-slate-700 transition hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={32} />
              <span className="absolute right-1 top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1 text-sm font-black text-white ring-2 ring-white">
                1
              </span>
            </button>

            <button
              type="button"
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-lg font-black shadow-sm transition hover:bg-slate-50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-base font-black text-white">
                {initials}
              </span>
              <ChevronDown size={24} className="text-slate-700" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="hidden h-16 items-center gap-2 rounded-2xl bg-emerald-500 px-7 text-xl font-black text-white shadow-sm transition hover:bg-emerald-600 sm:flex"
            >
              Quick Action
              <ChevronDown size={24} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-16 items-center justify-center rounded-2xl bg-slate-950 px-5 text-white transition hover:bg-slate-800"
              title="Logout"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;