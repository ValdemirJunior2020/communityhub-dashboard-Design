// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\pages\Dashboard.jsx
import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  Home,
  Send,
  Wrench,
} from "lucide-react";
import Toast from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "../hooks/useCollection";
import { seedDemoData } from "../services/seedService";
import { canSeedData } from "../utils/permissions";

function money(value) {
  return Number(value || 0).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function safeNumber(value) {
  return Number(value || 0);
}

function isOpenStatus(status) {
  return ["open", "scheduled", "inProgress", "in progress", "pending"].includes(
    String(status || "")
  );
}

function isOverduePayment(payment) {
  const today = new Date().toISOString().slice(0, 10);
  const status = String(payment.paymentStatus || "").toLowerCase();

  return (
    status === "overdue" ||
    (payment.dueDate &&
      payment.dueDate < today &&
      safeNumber(payment.amountPaid) < safeNumber(payment.amountDue))
  );
}

function leaseExpiresThisMonth(tenant) {
  if (!tenant.leaseEndDate) return false;

  const date = new Date(tenant.leaseEndDate);
  const now = new Date();

  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

function SmallStatus({ children, tone = "green" }) {
  const styles = {
    green: "bg-emerald-500 text-white",
    red: "bg-red-500 text-white",
    orange: "bg-orange-400 text-white",
    blue: "bg-blue-500 text-white",
    slate: "bg-slate-200 text-slate-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-black ${
        styles[tone] || styles.slate
      }`}
    >
      {children}
    </span>
  );
}

function KpiCard({ icon: Icon, title, value, subtitle, tone = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-500",
    red: "bg-red-50 text-red-500",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            colors[tone] || colors.blue
          }`}
        >
          <Icon size={26} />
        </div>

        {title === "Occupied Units" ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-emerald-500 text-lg font-black text-slate-900">
            {subtitle}
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-lg font-black text-slate-950">{title}</p>
      <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">{value}</p>

      {title !== "Occupied Units" ? (
        <p className="mt-1 text-base font-bold text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}

function TrendChart({ collectionRate, occupancy }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-black text-slate-950">
          Rent Collection & Occupancy Trend{" "}
          <span className="text-slate-500">(Last 6 Months)</span>
        </h2>

        <div className="flex flex-wrap gap-4 text-base font-bold text-slate-700">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-8 rounded-full bg-blue-600" />
            Rent Collected
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-8 rounded-full bg-emerald-500" />
            Occupancy Rate %
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-b from-white to-emerald-50/50 p-4">
        <svg viewBox="0 0 700 260" className="h-[260px] w-full">
          {[0, 1, 2, 3, 4].map((line) => (
            <line
              key={line}
              x1="40"
              x2="680"
              y1={40 + line * 45}
              y2={40 + line * 45}
              stroke="#dbe4ef"
              strokeWidth="1"
            />
          ))}

          <path
            d="M45 205 C95 120, 130 96, 175 112 C240 136, 290 120, 345 98 C400 78, 455 112, 510 78 C565 45, 620 54, 675 76"
            fill="none"
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M45 185 C95 155, 130 135, 190 134 C250 134, 300 160, 345 145 C390 120, 420 68, 465 92 C520 122, 575 108, 620 88 C650 72, 665 60, 675 52"
            fill="none"
            stroke="#10b981"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
            (month, index) => (
              <text
                key={month}
                x={45 + index * 90}
                y="245"
                textAnchor="middle"
                fontSize="18"
                fontWeight="800"
                fill="#0f172a"
              >
                {month}
              </text>
            )
          )}

          <text x="18" y="48" fontSize="16" fontWeight="800" fill="#334155">
            100
          </text>
          <text x="26" y="94" fontSize="16" fontWeight="800" fill="#334155">
            75
          </text>
          <text x="26" y="140" fontSize="16" fontWeight="800" fill="#334155">
            50
          </text>
          <text x="26" y="186" fontSize="16" fontWeight="800" fill="#334155">
            25
          </text>
          <text x="34" y="229" fontSize="16" fontWeight="800" fill="#334155">
            0
          </text>
        </svg>

        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-sm font-black uppercase tracking-widest text-blue-600">
              Current collection
            </p>
            <p className="text-3xl font-black text-blue-700">{collectionRate}%</p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm font-black uppercase tracking-widest text-emerald-600">
              Current occupancy
            </p>
            <p className="text-3xl font-black text-emerald-700">{occupancy}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState(null);

  const properties = useCollection("properties");
  const units = useCollection("units");
  const tenants = useCollection("tenants");
  const payments = useCollection("rentPayments");
  const maintenance = useCollection("maintenanceRequests");
  const workOrders = useCollection("workOrders");

  const loading = [properties, units, tenants, payments, maintenance, workOrders].some(
    (item) => item.loading
  );

  const error = [properties, units, tenants, payments, maintenance, workOrders].find(
    (item) => item.error
  )?.error;

  const stats = useMemo(() => {
    const totalProperties = properties.data.length;

    const totalUnits =
      units.data.length ||
      properties.data.reduce((sum, property) => sum + safeNumber(property.totalUnits), 0);

    const occupiedUnits =
      units.data.filter((unit) => unit.status === "occupied").length ||
      properties.data.reduce((sum, property) => sum + safeNumber(property.occupiedUnits), 0);

    const occupancy = totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

    const monthlyRentExpected =
      payments.data.reduce((sum, payment) => sum + safeNumber(payment.amountDue), 0) ||
      tenants.data.reduce((sum, tenant) => sum + safeNumber(tenant.rentAmount), 0);

    const monthlyRentCollected = payments.data.reduce(
      (sum, payment) => sum + safeNumber(payment.amountPaid),
      0
    );

    const collectionRate = monthlyRentExpected
      ? Math.round((monthlyRentCollected / monthlyRentExpected) * 100)
      : 0;

    const pendingMaintenance = maintenance.data.filter((item) =>
      ["open", "inProgress", "in progress"].includes(String(item.status || ""))
    ).length;

    const highPriorityMaintenance = maintenance.data.filter((item) =>
      ["high", "emergency"].includes(String(item.priority || "").toLowerCase())
    ).length;

    const openWorkOrders = workOrders.data.filter((item) => isOpenStatus(item.status)).length;
    const overduePayments = payments.data.filter(isOverduePayment);
    const activeTenants = tenants.data.filter((tenant) => tenant.status === "active").length;
    const expiringLeases = tenants.data.filter(leaseExpiresThisMonth).length;

    return {
      totalProperties,
      totalUnits,
      occupiedUnits,
      occupancy,
      monthlyRentExpected,
      monthlyRentCollected,
      collectionRate,
      pendingMaintenance,
      highPriorityMaintenance,
      openWorkOrders,
      overduePaymentsCount: overduePayments.length,
      overduePaymentsTotal: overduePayments.reduce(
        (sum, payment) =>
          sum +
          Math.max(
            safeNumber(payment.amountDue) - safeNumber(payment.amountPaid),
            0
          ),
        0
      ),
      activeTenants,
      expiringLeases,
    };
  }, [
    maintenance.data,
    payments.data,
    properties.data,
    tenants.data,
    units.data,
    workOrders.data,
  ]);

  async function handleSeed() {
    setSeeding(true);

    try {
      await seedDemoData({
        uid: currentUser?.uid,
        email: currentUser?.email,
      });

      setToast({
        type: "success",
        message: "Demo data seeded successfully. Your dashboard is live now.",
      });
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Unable to seed demo data.",
      });
    } finally {
      setSeeding(false);
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading live dashboard data..." />;
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-3xl bg-red-50 p-5 text-lg font-black text-red-700">
          {error}
        </div>
      ) : null}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard
          icon={Home}
          title="Total Properties"
          value={stats.totalProperties}
          subtitle="Active portfolio"
          tone="blue"
        />

        <KpiCard
          icon={CheckCircle2}
          title="Occupied Units"
          value={`${stats.occupiedUnits} Units`}
          subtitle={`${stats.occupancy}%`}
          tone="green"
        />

        <KpiCard
          icon={DollarSign}
          title="Monthly Rent Collected"
          value={money(stats.monthlyRentCollected)}
          subtitle={`Target: ${money(stats.monthlyRentExpected)}`}
          tone="blue"
        />

        <KpiCard
          icon={Wrench}
          title="Pending Maintenance"
          value={stats.pendingMaintenance}
          subtitle="Requests"
          tone="orange"
        />

        <KpiCard
          icon={AlertTriangle}
          title="Overdue Payments"
          value={stats.overduePaymentsCount}
          subtitle={money(stats.overduePaymentsTotal)}
          tone="red"
        />

        <KpiCard
          icon={ClipboardList}
          title="Open Work Orders"
          value={stats.openWorkOrders}
          subtitle="Active"
          tone="blue"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1fr]">
        <TrendChart collectionRate={stats.collectionRate} occupancy={stats.occupancy} />

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950">Property Overview</h2>

            {canSeedData(userProfile) ? (
              <button
                type="button"
                onClick={handleSeed}
                disabled={seeding}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-base font-black text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {seeding ? "Seeding..." : "Seed Data"}
              </button>
            ) : null}
          </div>

          {properties.data.length ? (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {properties.data.slice(0, 6).map((property) => {
                const total = safeNumber(property.totalUnits);
                const occupied = safeNumber(property.occupiedUnits);
                const percent = total ? Math.round((occupied / total) * 100) : stats.occupancy;

                return (
                  <div
                    key={property.id}
                    className="rounded-2xl border border-slate-200 p-3"
                  >
                    <div className="flex gap-3">
                      {property.imageUrl ? (
                        <img
                          src={property.imageUrl}
                          alt={property.propertyName}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <Building2 size={34} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-xl font-black text-slate-950">
                          {property.propertyName || "Property"}
                        </p>
                        <p className="text-base font-bold leading-tight text-slate-700">
                          {property.city || "Community"} {property.state || ""}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-black text-slate-500">Occupancy %</p>
                        <p className="text-2xl font-black text-slate-950">{percent}%</p>
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-500">Income</p>
                        <p className="text-2xl font-black text-slate-950">
                          {money(property.monthlyIncome)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center">
              <Building2 size={42} className="mx-auto text-slate-400" />
              <p className="mt-3 text-xl font-black text-slate-950">
                No property records yet
              </p>
              <p className="mt-1 text-base font-bold text-slate-500">
                Promote your account to admin and click Seed Data to fill the dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-2xl font-black text-slate-950">
                Maintenance Center
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Issue
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Property
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Priority
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Status
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Due Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {maintenance.data.slice(0, 4).map((item) => (
                    <tr key={item.id} className="border-t border-slate-100">
                      <td className="px-5 py-4 text-base font-bold text-slate-800">
                        {item.issueTitle || "Maintenance request"}
                      </td>
                      <td className="px-5 py-4 text-base font-bold text-slate-600">
                        {item.propertyName || item.propertyId || "Property"}
                      </td>
                      <td className="px-5 py-4">
                        <SmallStatus
                          tone={
                            ["high", "emergency"].includes(
                              String(item.priority || "").toLowerCase()
                            )
                              ? "red"
                              : "orange"
                          }
                        >
                          {item.priority || "Medium"}
                        </SmallStatus>
                      </td>
                      <td className="px-5 py-4">
                        <SmallStatus
                          tone={item.status === "completed" ? "green" : "orange"}
                        >
                          {item.status || "Open"}
                        </SmallStatus>
                      </td>
                      <td className="px-5 py-4 text-base font-bold text-slate-600">
                        {item.dueDate || "Not set"}
                      </td>
                    </tr>
                  ))}

                  {!maintenance.data.length ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-8 text-center text-lg font-bold text-slate-500"
                      >
                        No maintenance records yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-2xl font-black text-slate-950">
                Rent Payment Tracker
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Tenant
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Unit
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Payment Status
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Amount Due
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Due Date
                    </th>
                    <th className="px-5 py-4 text-base font-black text-slate-900">
                      Method
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {payments.data.slice(0, 4).map((payment) => (
                    <tr key={payment.id} className="border-t border-slate-100">
                      <td className="px-5 py-4 text-base font-bold text-slate-800">
                        {payment.tenantName || payment.tenantId || "Tenant"}
                      </td>
                      <td className="px-5 py-4 text-base font-bold text-slate-600">
                        {payment.unitNumber || payment.unitId || "Unit"}
                      </td>
                      <td className="px-5 py-4">
                        <SmallStatus tone={isOverduePayment(payment) ? "red" : "green"}>
                          {isOverduePayment(payment)
                            ? "Overdue"
                            : payment.paymentStatus || "Paid"}
                        </SmallStatus>
                      </td>
                      <td className="px-5 py-4 text-base font-bold text-slate-800">
                        {money(payment.amountDue)}
                      </td>
                      <td className="px-5 py-4 text-base font-bold text-slate-600">
                        {payment.dueDate || "Not set"}
                      </td>
                      <td className="px-5 py-4 text-base font-bold text-slate-600">
                        {payment.paymentMethod || "Open"}
                      </td>
                    </tr>
                  ))}

                  {!payments.data.length ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-8 text-center text-lg font-bold text-slate-500"
                      >
                        No rent payment records yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">
              Smart Alerts Panel
            </h2>

            <div className="mt-5 divide-y divide-slate-200">
              <div className="flex items-center gap-4 py-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <Bell size={24} />
                </span>
                <p className="text-lg font-bold text-slate-900">
                  {stats.expiringLeases} Leases Expiring This Month
                </p>
              </div>

              <div className="flex items-center gap-4 py-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <AlertTriangle size={24} />
                </span>
                <p className="text-lg font-bold text-slate-900">
                  {stats.highPriorityMaintenance} High-Priority Maintenance Requests
                </p>
              </div>

              <div className="flex items-center gap-4 py-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <DollarSign size={24} />
                </span>
                <p className="text-lg font-bold text-slate-900">
                  {stats.overduePaymentsCount} Overdue Rent Payments
                </p>
              </div>

              <div className="flex items-center gap-4 py-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                  <CalendarDays size={24} />
                </span>
                <p className="text-lg font-bold text-slate-900">
                  Inspection Schedule Ready
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Bot size={28} />
              </span>
              <h2 className="text-2xl font-black text-slate-950">
                Property AI Assistant
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Summarize tenant issues and generate property management notes.",
                "Suggest the next action, such as assigning a vendor.",
                "Detect overdue payments and promote collection follow-up.",
                "Generate owner-ready property reports.",
              ].map((text) => (
                <div
                  key={text}
                  className="flex gap-3 rounded-2xl bg-slate-100 p-4 text-base font-bold text-slate-800"
                >
                  <Send size={20} className="mt-1 shrink-0 text-slate-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default Dashboard;