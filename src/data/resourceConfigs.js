// src/data/resourceConfigs.js
export const propertyStatuses = ["active", "maintenance", "inactive"];
export const propertyTypes = ["Apartments", "Townhomes", "Mobile Home Community", "RV Community", "Single Family Portfolio", "Commercial", "Mixed Use"];
export const unitStatuses = ["available", "occupied", "maintenance", "reserved"];
export const tenantStatuses = ["active", "notice", "past", "pending"];
export const paymentStatuses = ["paid", "partial", "overdue", "pending"];
export const maintenancePriorities = ["low", "medium", "high", "emergency"];
export const maintenanceStatuses = ["open", "inProgress", "completed", "cancelled"];
export const workOrderStatuses = ["open", "scheduled", "inProgress", "completed", "cancelled"];
export const inspectionStatuses = ["scheduled", "completed", "cancelled"];
export const inspectionResults = ["pending", "passed", "failed", "needsFollowUp"];
export const vendorStatuses = ["active", "inactive", "pending"];
export const documentTypes = ["Lease", "Policy", "Insurance", "Invoice", "Inspection", "Owner Statement", "Other"];

export function toOptions(items) {
  return items.map((item) => ({ value: item, label: item.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()) }));
}

export function relationOptions(items, labelKey, emptyLabel = "None") {
  return [{ value: "", label: emptyLabel }, ...items.map((item) => ({ value: item.id, label: item[labelKey] || item.email || item.id }))];
}

export function createRelationMap(items, labelKey) {
  return items.reduce((acc, item) => {
    acc[item.id] = item[labelKey] || item.email || item.id;
    return acc;
  }, {});
}
