// src/utils/permissions.js
export const ROLES = ["superAdmin", "admin", "manager", "maintenance", "viewer"];
export const USER_STATUSES = ["active", "inactive", "pending"];

export const roleLabels = {
  superAdmin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
  maintenance: "Maintenance",
  viewer: "Viewer"
};

export function normalizeRole(role) {
  return ROLES.includes(role) ? role : "viewer";
}

export function isActiveUser(userProfile) {
  return userProfile?.status === "active" || userProfile?.status === undefined;
}

export function hasAnyRole(userProfile, roles = []) {
  if (!userProfile || !isActiveUser(userProfile)) return false;
  return roles.includes(normalizeRole(userProfile.role));
}

export function isAdminRole(userProfile) {
  return hasAnyRole(userProfile, ["superAdmin", "admin"]);
}

export function canManageUsers(userProfile) {
  return isAdminRole(userProfile);
}

export function canSeedData(userProfile) {
  return isAdminRole(userProfile);
}

export function canManageRecords(userProfile) {
  return hasAnyRole(userProfile, ["superAdmin", "admin", "manager"]);
}

export function canDeleteRecords(userProfile) {
  return hasAnyRole(userProfile, ["superAdmin", "admin"]);
}

export function canViewOperationalData(userProfile) {
  return hasAnyRole(userProfile, ["superAdmin", "admin", "manager", "maintenance", "viewer"]);
}

export function canAccessRoute(userProfile, routeRoles = []) {
  if (!routeRoles.length) return isActiveUser(userProfile);
  return hasAnyRole(userProfile, routeRoles);
}
