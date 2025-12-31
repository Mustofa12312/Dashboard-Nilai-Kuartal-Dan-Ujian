export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  GURU: "guru",
};

export const PERMISSIONS = {
  MANAGE_USERS: [ROLES.SUPER_ADMIN],
  MANAGE_STUDENTS: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  INPUT_GRADES: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GURU],
  EXPORT_REPORTS: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
};

export function hasPermission(userRole, permissionKey) {
  if (!userRole) return false;

  const allowedRoles = PERMISSIONS[permissionKey];
  if (!allowedRoles) return false;

  return allowedRoles.includes(userRole);
}
