// src/pages/Properties.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { useCollection } from "../hooks/useCollection";
import { createRelationMap, propertyStatuses, propertyTypes, relationOptions, toOptions } from "../data/resourceConfigs";
import StatusBadge from "../components/StatusBadge";

function Properties() {
  const properties = useCollection("properties");
  const owners = useCollection("owners");
  const ownerMap = createRelationMap(owners.data, "fullName");

  const fields = [
    { name: "propertyName", label: "Property Name", required: true },
    { name: "address", label: "Address", required: true },
    { name: "city", label: "City", required: true },
    { name: "state", label: "State", required: true },
    { name: "zipCode", label: "Zip Code" },
    { name: "propertyType", label: "Property Type", type: "select", options: toOptions(propertyTypes), required: true },
    { name: "imageUrl", label: "Image URL", type: "url", fullWidth: true },
    { name: "ownerId", label: "Owner", type: "select", options: relationOptions(owners.data, "fullName", "No owner selected") },
    { name: "totalUnits", label: "Total Units", type: "number", defaultValue: 0 },
    { name: "occupiedUnits", label: "Occupied Units", type: "number", defaultValue: 0 },
    { name: "monthlyIncome", label: "Monthly Income", type: "currency", defaultValue: 0 },
    { name: "status", label: "Status", type: "select", options: toOptions(propertyStatuses), defaultValue: "active" },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];

  const columns = [
    { key: "imageUrl", label: "Image", render: (row) => row.imageUrl ? <img src={row.imageUrl} alt={row.propertyName} className="h-16 w-24 rounded-2xl object-cover" /> : <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-slate-100 text-xs font-black text-slate-400">No image</div> },
    { key: "propertyName", label: "Property" },
    { key: "propertyType", label: "Type" },
    { key: "location", label: "Location", render: (row) => `${row.city || ""}, ${row.state || ""}` },
    { key: "ownerId", label: "Owner", render: (row) => ownerMap[row.ownerId] || "—" },
    { key: "totalUnits", label: "Units" },
    { key: "monthlyIncome", label: "Income", type: "currency" },
    { key: "status", label: "Status", type: "status", render: (row) => <StatusBadge value={row.status} /> }
  ];

  return (
    <CrudPage
      title="Properties"
      subtitle="Create and manage communities, homes, apartments, RV parks, property images by URL, owner links, status, and income data."
      collectionName="properties"
      fields={fields}
      columns={columns}
      data={properties.data}
      loading={properties.loading || owners.loading}
      error={properties.error || owners.error}
      searchFields={["propertyName", "address", "city", "state", "propertyType", "status"]}
      filters={[
        { name: "status", label: "Status", options: toOptions(propertyStatuses) },
        { name: "propertyType", label: "Type", options: toOptions(propertyTypes) }
      ]}
    />
  );
}

export default Properties;
