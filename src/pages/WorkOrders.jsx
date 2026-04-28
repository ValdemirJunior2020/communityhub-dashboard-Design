// src/pages/WorkOrders.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { createRelationMap, maintenancePriorities, relationOptions, toOptions, workOrderStatuses } from "../data/resourceConfigs";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "../hooks/useCollection";
import { useCollectionWhere } from "../hooks/useCollectionWhere";

function WorkOrders() {
  const { currentUser, userProfile } = useAuth();
  const isMaintenanceOnly = userProfile?.role === "maintenance";
  const allWorkOrders = useCollection("workOrders", "createdAt", !isMaintenanceOnly);
  const assignedWorkOrders = useCollectionWhere("workOrders", "assignedTo", "==", currentUser?.email, isMaintenanceOnly);
  const workOrders = isMaintenanceOnly ? assignedWorkOrders : allWorkOrders;
  const maintenance = useCollection("maintenanceRequests", "createdAt", !isMaintenanceOnly);
  const properties = useCollection("properties");
  const units = useCollection("units");
  const vendors = useCollection("vendors");
  const propertyMap = createRelationMap(properties.data, "propertyName");
  const unitMap = createRelationMap(units.data, "unitNumber");
  const vendorMap = createRelationMap(vendors.data, "companyName");
  const maintenanceMap = createRelationMap(maintenance.data, "issueTitle");


  const fields = [
    { name: "maintenanceId", label: "Maintenance Request", type: "select", options: relationOptions(maintenance.data, "issueTitle", "No linked request") },
    { name: "propertyId", label: "Property", type: "select", options: relationOptions(properties.data, "propertyName"), required: true },
    { name: "unitId", label: "Unit", type: "select", options: relationOptions(units.data, "unitNumber", "No unit") },
    { name: "title", label: "Title", required: true },
    { name: "description", label: "Description", type: "textarea", fullWidth: true },
    { name: "assignedTo", label: "Assigned To" },
    { name: "vendorId", label: "Vendor", type: "select", options: relationOptions(vendors.data, "companyName", "No vendor") },
    { name: "status", label: "Status", type: "select", options: toOptions(workOrderStatuses), defaultValue: "open" },
    { name: "priority", label: "Priority", type: "select", options: toOptions(maintenancePriorities), defaultValue: "medium" },
    { name: "scheduledDate", label: "Scheduled Date", type: "date" },
    { name: "completedDate", label: "Completed Date", type: "date" },
    { name: "estimatedCost", label: "Estimated Cost", type: "currency", defaultValue: 0 },
    { name: "finalCost", label: "Final Cost", type: "currency", defaultValue: 0 },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];

  const columns = [
    { key: "title", label: "Work Order" },
    { key: "maintenanceId", label: "Request", render: (row) => maintenanceMap[row.maintenanceId] || "—" },
    { key: "propertyId", label: "Property", render: (row) => propertyMap[row.propertyId] || "—" },
    { key: "unitId", label: "Unit", render: (row) => unitMap[row.unitId] || "—" },
    { key: "vendorId", label: "Vendor", render: (row) => vendorMap[row.vendorId] || "—" },
    { key: "priority", label: "Priority", type: "status" },
    { key: "status", label: "Status", type: "status" }
  ];

  return (
    <CrudPage
      title="Work Orders"
      subtitle="Schedule and track operational work, linked maintenance requests, vendors, estimated cost, final cost, and completion status."
      collectionName="workOrders"
      fields={fields}
      columns={columns}
      data={workOrders.data}
      loading={workOrders.loading || maintenance.loading || properties.loading || units.loading || vendors.loading}
      error={workOrders.error || maintenance.error || properties.error || units.error || vendors.error}
      searchFields={["title", "description", "assignedTo", "status", "priority", "notes"]}
      filters={[
        { name: "status", label: "Status", options: toOptions(workOrderStatuses) },
        { name: "priority", label: "Priority", options: toOptions(maintenancePriorities) },
        { name: "propertyId", label: "Property", options: relationOptions(properties.data, "propertyName").slice(1) }
      ]}
      customCanWrite={!isMaintenanceOnly && ["superAdmin", "admin", "manager"].includes(userProfile?.role)}
      customCanDelete={["superAdmin", "admin"].includes(userProfile?.role)}
    />
  );
}

export default WorkOrders;
