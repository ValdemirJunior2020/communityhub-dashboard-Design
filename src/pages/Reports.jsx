// src/pages/Reports.jsx
import React, { useMemo } from "react";
import { AlertTriangle, BarChart3, DollarSign, Home, Percent, Wrench } from "lucide-react";
import DataTable from "../components/DataTable";
import LoadingSpinner from "../components/LoadingSpinner";
import StatCard from "../components/StatCard";
import { useCollection } from "../hooks/useCollection";

function money(value) {
  return Number(value || 0).toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function Reports() {
  const properties = useCollection("properties");
  const units = useCollection("units");
  const payments = useCollection("rentPayments");
  const maintenance = useCollection("maintenanceRequests");
  const tenants = useCollection("tenants");

  const loading = [properties, units, payments, maintenance, tenants].some((item) => item.loading);
  const error = [properties, units, payments, maintenance, tenants].find((item) => item.error)?.error;

  const report = useMemo(() => {
    const totalUnits = units.data.length || properties.data.reduce((sum, item) => sum + Number(item.totalUnits || 0), 0);
    const occupied = units.data.filter((unit) => unit.status === "occupied").length || properties.data.reduce((sum, item) => sum + Number(item.occupiedUnits || 0), 0);
    const expected = payments.data.reduce((sum, item) => sum + Number(item.amountDue || 0), 0) || tenants.data.reduce((sum, item) => sum + Number(item.rentAmount || 0), 0);
    const collected = payments.data.reduce((sum, item) => sum + Number(item.amountPaid || 0), 0);
    const overdue = payments.data.filter((item) => item.paymentStatus === "overdue").reduce((sum, item) => sum + (Number(item.amountDue || 0) - Number(item.amountPaid || 0)), 0);
    const openMaintenance = maintenance.data.filter((item) => ["open", "inProgress"].includes(item.status)).length;
    const propertyIncomeRows = properties.data.map((property) => {
      const propertyPayments = payments.data.filter((payment) => payment.propertyId === property.id);
      const propertyUnits = units.data.filter((unit) => unit.propertyId === property.id);
      const propertyExpected = propertyPayments.reduce((sum, payment) => sum + Number(payment.amountDue || 0), 0) || propertyUnits.reduce((sum, unit) => sum + Number(unit.rentAmount || 0), 0);
      const propertyCollected = propertyPayments.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0);
      const unitCount = propertyUnits.length || Number(property.totalUnits || 0);
      const occupiedCount = propertyUnits.filter((unit) => unit.status === "occupied").length || Number(property.occupiedUnits || 0);
      return {
        id: property.id,
        propertyName: property.propertyName,
        occupancy: unitCount ? `${Math.round((occupiedCount / unitCount) * 100)}%` : "0%",
        expected: propertyExpected,
        collected: propertyCollected,
        openMaintenance: maintenance.data.filter((item) => item.propertyId === property.id && ["open", "inProgress"].includes(item.status)).length
      };
    });

    return {
      occupancy: totalUnits ? Math.round((occupied / totalUnits) * 100) : 0,
      expected,
      collected,
      collectionRate: expected ? Math.round((collected / expected) * 100) : 0,
      overdue,
      openMaintenance,
      propertyIncomeRows
    };
  }, [maintenance.data, payments.data, properties.data, tenants.data, units.data]);

  if (loading) return <LoadingSpinner label="Building reports..." />;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">Reports</p>
        <h1 className="dashboard-section-title mt-2">Portfolio Intelligence</h1>
        <p className="mt-2 max-w-4xl text-lg font-semibold text-slate-500">Useful visual report cards and tables built from the same live Firestore collections.</p>
      </section>

      {error ? <div className="rounded-3xl bg-red-50 p-5 text-lg font-black text-red-700">{error}</div> : null}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Occupancy" value={`${report.occupancy}%`} subtitle="Units occupied" icon={Percent} tone="green" />
        <StatCard title="Rent Expected" value={money(report.expected)} subtitle="Current cycle" icon={DollarSign} tone="blue" />
        <StatCard title="Collected" value={money(report.collected)} subtitle={`${report.collectionRate}% collection`} icon={BarChart3} tone="green" />
        <StatCard title="Overdue" value={money(report.overdue)} subtitle="Open balance" icon={AlertTriangle} tone="red" />
        <StatCard title="Maintenance" value={report.openMaintenance} subtitle="Open items" icon={Wrench} tone="orange" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="dashboard-card p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">Rent collection report</h2>
          <div className="mt-5 h-5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-600" style={{ width: `${Math.min(report.collectionRate, 100)}%` }} />
          </div>
          <p className="mt-4 text-lg font-bold text-slate-600">Collected {money(report.collected)} of {money(report.expected)} expected rent.</p>
        </div>
        <div className="dashboard-card p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">Maintenance summary</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-orange-50 p-5 text-orange-700"><p className="text-sm font-black uppercase tracking-widest">Open</p><p className="mt-2 text-4xl font-black">{maintenance.data.filter((item) => item.status === "open").length}</p></div>
            <div className="rounded-3xl bg-violet-50 p-5 text-violet-700"><p className="text-sm font-black uppercase tracking-widest">In progress</p><p className="mt-2 text-4xl font-black">{maintenance.data.filter((item) => item.status === "inProgress").length}</p></div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <Home className="text-blue-600" size={28} />
          <h2 className="text-2xl font-black text-slate-950">Property income summary</h2>
        </div>
        <DataTable
          rows={report.propertyIncomeRows}
          columns={[
            { key: "propertyName", label: "Property" },
            { key: "occupancy", label: "Occupancy" },
            { key: "expected", label: "Expected", type: "currency" },
            { key: "collected", label: "Collected", type: "currency" },
            { key: "openMaintenance", label: "Open Maintenance" }
          ]}
        />
      </section>
    </div>
  );
}

export default Reports;
