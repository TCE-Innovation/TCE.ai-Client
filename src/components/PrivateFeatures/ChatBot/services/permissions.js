import { PROFILES } from "../constants/admin";

import { checkPermission } from "../utils/auth";
import { PERMISSIONS } from "../constants/permissions";

class PermissionReader {
  #data = {
    userDetails: null,
  };
  constructor() {
    this.#data.userDetails = null;
  }
  updateUser(userDetails) {
    this.#data.userDetails = userDetails;
  }
  get permission() {
    return PERMISSIONS;
  }
  #getPermission(resource) {
    return checkPermission(this.#data.userDetails, resource);
  }
  getUserPermission(permission) {
    return this.#getPermission([PROFILES.USERS, permission]);
  }
  getProjectPermission(permission) {
    return this.#getPermission([PROFILES.PROJECTS, permission]);
  }
  getProjectUserPermission(permission) {
    return this.#getPermission([PROFILES.PROJECT_USERS, permission]);
  }
  getProjectDocumentPermission(permission) {
    return this.#getPermission([PROFILES.PROJECT_DOCS, permission]);
  }
  getProjectTeamPermission(permission) {
    return this.#getPermission([PROFILES.PROJECT_TEAMS, permission]);
  }
  getProjectStatisticsPermission(permission) {
    return this.#getPermission([PROFILES.PROJECT_STATS, permission]);
  }
  getProjectStatusPermission(permission) {
    return this.#getPermission([PROFILES.PROJECT_STATUS, permission]);
  }
  getUserStatisticsPermission(permission) {
    return this.#getPermission([PROFILES.USERS_STATS, permission]);
  }
  getTeamStatisticsPermission(permission) {
    return this.#getPermission([PROFILES.TEAM_STATS, permission]);
  }
  getTeamUserPermission(permission) {
    return this.#getPermission([PROFILES.TEAM_USERS, permission]);
  }
  getOverviewPermission(permission) {
    return this.#getPermission([PROFILES.OVERVIEW, permission]);
  }
}

const permissionReader = new PermissionReader();

Object.freeze(permissionReader);

export default permissionReader;
