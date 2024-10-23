import {} from 'sanity';
import { ROLE } from '../../constants/roles';
export function isDeveloperOrAdmin(currentUser) {
  const allowedRoles = [ROLE.ADMINISTRATOR, ROLE.DEVELOPER];
  return !!isValidRole(allowedRoles, currentUser);
}
export function isDeveloper(currentUser) {
  const allowedRoles = [ROLE.DEVELOPER];
  return !!isValidRole(allowedRoles, currentUser);
}
export function isAdmin(currentUser) {
  const allowedRoles = [ROLE.ADMINISTRATOR];
  return !!isValidRole(allowedRoles, currentUser);
}
export function isValidRole(roles, currentUser) {
  return currentUser?.roles.some((role) => roles.includes(role.name));
}
