// src/pages/Tenants.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { createRelationMap, relationOptions, tenantStatuses, toOptions } from "../data/resourceConfigs";
import { useCollection } from "../hooks/useCollection";

function Tenants() {
  const tenants = useCollection("tenants");
  const properties = useCollection("properties");
  const units = useCollection("units");
  const propertyMap = createRelationMap(properties.data, "propertyName");
  const unitMap = createRelationMap(units.data, "unitNumber");

  const fields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone" },
    { name: "emergencyContactName", label: "Emergency Contact Name" },
    { name: "emergencyContactPhone", label: "Emergency Contact Phone" },
    { name: "propertyId", label: "Property", type: "select", options: relationOptions(properties.data, "propertyName"), required: true },
    { name: "unitId", label: "Unit", type: "select", options: relationOptions(units.data, "unitNumber", "No unit selected") },
    { name: "leaseStartDate", label: "Lease Start Date", type: "date" },
    { name: "leaseEndDate", label: "Lease End Date", type: "date" },
    { name: "rentAmount", label: "Rent Amount", type: "currency", defaultValue: 0 },
    { name: "status", label: "Status", type: "select", options: toOptions(tenantStatuses), defaultValue: "active" },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];

  const columns = [
    { key: "fullName", label: "Tenant" },
    { key: "phone", label: "Phone" },
    { key: "propertyId", label: "Property", render: (row) => propertyMap[row.propertyId] || "—" },
    { key: "unitId", label: "Unit", render: (row) => unitMap[row.unitId] || "—" },
    { key: "leaseEndDate", label: "Lease End" },
    { key: "rentAmount", label: "Rent", type: "currency" },
    { key: "status", label: "Status", type: "status" }
  ];

  return (
    <CrudPage
      title="Tenants"
      subtitle="Manage tenant profiles, emergency contacts, leases, rent amounts, and unit/property assignments."
      collectionName="tenants"
      fields={fields}
      columns={columns}
      data={tenants.data}
      loading={tenants.loading || properties.loading || units.loading}
      error={tenants.error || properties.error || units.error}
      searchFields={["fullName", "email", "phone", "status"]}
      filters={[
        { name: "propertyId", label: "Property", options: relationOptions(properties.data, "propertyName").slice(1) },
        { name: "status", label: "Status", options: toOptions(tenantStatuses) }
      ]}
    />
  );
}

export default Tenants;
