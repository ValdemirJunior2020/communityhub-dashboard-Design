// src/pages/Inspections.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { createRelationMap, inspectionResults, inspectionStatuses, relationOptions, toOptions } from "../data/resourceConfigs";
import { useCollection } from "../hooks/useCollection";

function Inspections() {
  const inspections = useCollection("inspections");
  const properties = useCollection("properties");
  const units = useCollection("units");
  const propertyMap = createRelationMap(properties.data, "propertyName");
  const unitMap = createRelationMap(units.data, "unitNumber");

  const fields = [
    { name: "propertyId", label: "Property", type: "select", options: relationOptions(properties.data, "propertyName"), required: true },
    { name: "unitId", label: "Unit", type: "select", options: relationOptions(units.data, "unitNumber", "No unit") },
    { name: "inspectionType", label: "Inspection Type", required: true },
    { name: "scheduledDate", label: "Scheduled Date", type: "date" },
    { name: "completedDate", label: "Completed Date", type: "date" },
    { name: "inspectorName", label: "Inspector Name" },
    { name: "status", label: "Status", type: "select", options: toOptions(inspectionStatuses), defaultValue: "scheduled" },
    { name: "result", label: "Result", type: "select", options: toOptions(inspectionResults), defaultValue: "pending" },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];

  const columns = [
    { key: "inspectionType", label: "Type" },
    { key: "propertyId", label: "Property", render: (row) => propertyMap[row.propertyId] || "—" },
    { key: "unitId", label: "Unit", render: (row) => unitMap[row.unitId] || "—" },
    { key: "scheduledDate", label: "Scheduled" },
    { key: "inspectorName", label: "Inspector" },
    { key: "result", label: "Result", type: "status" },
    { key: "status", label: "Status", type: "status" }
  ];

  return (
    <CrudPage
      title="Inspections"
      subtitle="Schedule property and unit inspections, document outcomes, inspectors, results, and follow-up notes."
      collectionName="inspections"
      fields={fields}
      columns={columns}
      data={inspections.data}
      loading={inspections.loading || properties.loading || units.loading}
      error={inspections.error || properties.error || units.error}
      searchFields={["inspectionType", "inspectorName", "status", "result", "notes"]}
      filters={[
        { name: "status", label: "Status", options: toOptions(inspectionStatuses) },
        { name: "propertyId", label: "Property", options: relationOptions(properties.data, "propertyName").slice(1) }
      ]}
    />
  );
}

export default Inspections;
