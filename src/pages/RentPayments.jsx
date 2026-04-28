// src/pages/RentPayments.jsx
import React, { useMemo } from "react";
import CrudPage from "../components/CrudPage";
import { createRelationMap, paymentStatuses, relationOptions, toOptions } from "../data/resourceConfigs";
import { useCollection } from "../hooks/useCollection";

function RentPayments() {
  const payments = useCollection("rentPayments");
  const tenants = useCollection("tenants");
  const properties = useCollection("properties");
  const units = useCollection("units");
  const tenantMap = createRelationMap(tenants.data, "fullName");
  const propertyMap = createRelationMap(properties.data, "propertyName");
  const unitMap = createRelationMap(units.data, "unitNumber");

  const rows = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return payments.data.map((payment) => {
      const isOverdue = payment.dueDate && payment.dueDate < today && Number(payment.amountPaid || 0) < Number(payment.amountDue || 0);
      return { ...payment, paymentStatus: isOverdue ? "overdue" : payment.paymentStatus };
    });
  }, [payments.data]);

  const fields = [
    { name: "tenantId", label: "Tenant", type: "select", options: relationOptions(tenants.data, "fullName"), required: true },
    { name: "propertyId", label: "Property", type: "select", options: relationOptions(properties.data, "propertyName"), required: true },
    { name: "unitId", label: "Unit", type: "select", options: relationOptions(units.data, "unitNumber", "No unit selected") },
    { name: "amountDue", label: "Amount Due", type: "currency", defaultValue: 0 },
    { name: "amountPaid", label: "Amount Paid", type: "currency", defaultValue: 0 },
    { name: "dueDate", label: "Due Date", type: "date" },
    { name: "paidDate", label: "Paid Date", type: "date" },
    { name: "paymentStatus", label: "Payment Status", type: "select", options: toOptions(paymentStatuses), defaultValue: "pending" },
    { name: "paymentMethod", label: "Payment Method" },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];

  const columns = [
    { key: "tenantId", label: "Tenant", render: (row) => tenantMap[row.tenantId] || "—" },
    { key: "propertyId", label: "Property", render: (row) => propertyMap[row.propertyId] || "—" },
    { key: "unitId", label: "Unit", render: (row) => unitMap[row.unitId] || "—" },
    { key: "amountDue", label: "Due", type: "currency" },
    { key: "amountPaid", label: "Paid", type: "currency" },
    { key: "dueDate", label: "Due Date" },
    { key: "paymentStatus", label: "Status", type: "status" }
  ];

  return (
    <CrudPage
      title="Rent Payments"
      subtitle="Track rent due, rent collected, partial payments, overdue balances, methods, and monthly collection health."
      collectionName="rentPayments"
      fields={fields}
      columns={columns}
      data={rows}
      loading={payments.loading || tenants.loading || properties.loading || units.loading}
      error={payments.error || tenants.error || properties.error || units.error}
      searchFields={["paymentStatus", "paymentMethod", "notes"]}
      filters={[
        { name: "paymentStatus", label: "Status", options: toOptions(paymentStatuses) },
        { name: "propertyId", label: "Property", options: relationOptions(properties.data, "propertyName").slice(1) }
      ]}
    />
  );
}

export default RentPayments;
