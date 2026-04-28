// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\layouts\DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DemoBanner from "../components/DemoBanner";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-shell flex min-h-screen w-full overflow-x-hidden bg-slate-100">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setMobileOpen(true)} />

        <main className="w-full flex-1 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <DemoBanner />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;