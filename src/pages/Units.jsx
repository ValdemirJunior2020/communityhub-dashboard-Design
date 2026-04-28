// src/pages/Units.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { createRelationMap, relationOptions, toOptions, unitStatuses } from "../data/resourceConfigs";
import { useCollection } from "../hooks/useCollection";

function Units() {
  const units = useCollection("units");
  const properties = useCollection("properties");
  const tenants = useCollection("tenants");
  const propertyMap = createRelationMap(properties.data, "propertyName");
  const tenantMap = createRelationMap(tenants.data, "fullName");

  const fields = [
    { name: "propertyId", label: "Property", type: "select", options: relationOptions(properties.data, "propertyName"), required: true },
    { name: "unitNumber", label: "Unit Number", required: true },
    { name: "bedrooms", label: "Bedrooms", type: "number", defaultValue: 1 },
    { name: "bathrooms", label: "Bathrooms", type: "number", defaultValue: 1 },
    { name: "squareFeet", label: "Square Feet", type: "number", defaultValue: 0 },
    { name: "rentAmount", label: "Rent Amount", type: "currency", defaultValue: 0 },
    { name: "status", label: "Status", type: "select", options: toOptions(unitStatuses), defaultValue: "available" },
    { name: "tenantId", label: "Tenant", type: "select", options: relationOptions(tenants.data, "fullName", "No tenant") },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];

  const columns = [
    { key: "unitNumber", label: "Unit" },
    { key: "propertyId", label: "Property", render: (row) => propertyMap[row.propertyId] || "—" },
    { key: "bedrooms", label: "Beds" },
    { key: "bathrooms", label: "Baths" },
    { key: "rentAmount", label: "Rent", type: "currency" },
    { key: "tenantId", label: "Tenant", render: (row) => tenantMap[row.tenantId] || "—" },
    { key: "status", label: "Status", type: "status" }
  ];

  return (
    <CrudPage
      title="Units"
      subtitle="Manage every unit or lot, rent amount, status, tenant assignment, and property relationship."
      collectionName="units"
      fields={fields}
      columns={columns}
      data={units.data}
      loading={units.loading || properties.loading || tenants.loading}
      error={units.error || properties.error || tenants.error}
      searchFields={["unitNumber", "status", "notes"]}
      filters={[
        { name: "propertyId", label: "Property", options: relationOptions(properties.data, "propertyName").slice(1) },
        { name: "status", label: "Status", options: toOptions(unitStatuses) }
      ]}
    />
  );
}

export default Units;
