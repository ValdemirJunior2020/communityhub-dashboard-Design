// src/pages/Maintenance.jsx
import React from "react";
import CrudPage from "../components/CrudPage";
import { createRelationMap, maintenancePriorities, maintenanceStatuses, relationOptions, toOptions } from "../data/resourceConfigs";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "../hooks/useCollection";
import { useCollectionWhere } from "../hooks/useCollectionWhere";

function Maintenance() {
  const { currentUser, userProfile } = useAuth();
  const isMaintenanceOnly = userProfile?.role === "maintenance";
  const allMaintenance = useCollection("maintenanceRequests", "createdAt", !isMaintenanceOnly);
  const assignedMaintenance = useCollectionWhere("maintenanceRequests", "assignedUserId", "==", currentUser?.uid, isMaintenanceOnly);
  const maintenance = isMaintenanceOnly ? assignedMaintenance : allMaintenance;
  const tenants = useCollection("tenants");
  const properties = useCollection("properties");
  const units = useCollection("units");
  const vendors = useCollection("vendors");
  const canLoadUsers = ["superAdmin", "admin", "manager"].includes(userProfile?.role);
  const users = useCollection("users", "createdAt", canLoadUsers);
  const tenantMap = createRelationMap(tenants.data, "fullName");
  const propertyMap = createRelationMap(properties.data, "propertyName");
  const unitMap = createRelationMap(units.data, "unitNumber");
  const vendorMap = createRelationMap(vendors.data, "companyName");

  const maintenanceUsers = users.data.filter((item) => ["maintenance", "manager", "admin", "superAdmin"].includes(item.role));


  const fields = [
    { name: "tenantId", label: "Tenant", type: "select", options: relationOptions(tenants.data, "fullName", "No tenant") },
    { name: "propertyId", label: "Property", type: "select", options: relationOptions(properties.data, "propertyName"), required: true },
    { name: "unitId", label: "Unit", type: "select", options: relationOptions(units.data, "unitNumber", "No unit") },
    { name: "issueTitle", label: "Issue Title", required: true },
    { name: "issueDescription", label: "Issue Description", type: "textarea", fullWidth: true },
    { name: "priority", label: "Priority", type: "select", options: toOptions(maintenancePriorities), defaultValue: "medium" },
    { name: "status", label: "Status", type: "select", options: toOptions(maintenanceStatuses), defaultValue: "open" },
    { name: "assignedVendorId", label: "Assigned Vendor", type: "select", options: relationOptions(vendors.data, "companyName", "No vendor") },
    { name: "assignedUserId", label: "Assigned User", type: "select", options: relationOptions(maintenanceUsers, "fullName", "No user") },
    { name: "dueDate", label: "Due Date", type: "date" },
    { name: "completedDate", label: "Completed Date", type: "date" },
    { name: "cost", label: "Cost", type: "currency", defaultValue: 0 },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true }
  ];

  const columns = [
    { key: "issueTitle", label: "Issue" },
    { key: "propertyId", label: "Property", render: (row) => propertyMap[row.propertyId] || "—" },
    { key: "unitId", label: "Unit", render: (row) => unitMap[row.unitId] || "—" },
    { key: "tenantId", label: "Tenant", render: (row) => tenantMap[row.tenantId] || "—" },
    { key: "assignedVendorId", label: "Vendor", render: (row) => vendorMap[row.assignedVendorId] || "—" },
    { key: "priority", label: "Priority", type: "status" },
    { key: "status", label: "Status", type: "status" }
  ];

  return (
    <CrudPage
      title="Maintenance"
      subtitle="Manage tenant requests, property issues, priority, status, vendors, internal assignments, due dates, and costs."
      collectionName="maintenanceRequests"
      fields={fields}
      columns={columns}
      data={maintenance.data}
      loading={maintenance.loading || tenants.loading || properties.loading || units.loading || vendors.loading || users.loading}
      error={maintenance.error || tenants.error || properties.error || units.error || vendors.error || users.error}
      searchFields={["issueTitle", "issueDescription", "priority", "status", "notes"]}
      filters={[
        { name: "status", label: "Status", options: toOptions(maintenanceStatuses) },
        { name: "priority", label: "Priority", options: toOptions(maintenancePriorities) },
        { name: "propertyId", label: "Property", options: relationOptions(properties.data, "propertyName").slice(1) }
      ]}
      customCanWrite={!isMaintenanceOnly && ["superAdmin", "admin", "manager"].includes(userProfile?.role)}
      customCanDelete={["superAdmin", "admin"].includes(userProfile?.role)}
    />
  );
}

export default Maintenance;
