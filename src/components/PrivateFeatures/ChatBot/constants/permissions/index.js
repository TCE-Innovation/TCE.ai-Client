import { PROFILES, ROLES } from "../admin";

export const PERMISSIONS = {
  CREATE: Symbol("create"),
  READ: Symbol("read"),
  UPDATE: Symbol("update"),
  DELETE: Symbol("delete"),
  UPLOAD: Symbol("upload"),
  DOWNLOAD: Symbol("download"),
  ALL: Symbol("*"),
};

// const PERMUTATIONS = {
//   ALL: [
//     PERMISSIONS.CREATE,
//     PERMISSIONS.READ,
//     PERMISSIONS.UPDATE,
//     PERMISSIONS.DELETE,
//     PERMISSIONS.UPLOAD,
//     PERMISSIONS.DOWNLOAD,
//   ],
//   READONLY: [PERMISSIONS.READ],
//   CRUD: [
//     PERMISSIONS.CREATE,
//     PERMISSIONS.READ,
//     PERMISSIONS.UPDATE,
//     PERMISSIONS.DELETE,
//   ],
//   CRD: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.DELETE],
// };

export const ROLES_TO_PERMISSIONS = {
  [ROLES.USER]: [],
  [ROLES.PM]: [
    {
      module: PROFILES.PROJECTS,
      permissions: [PERMISSIONS.READ, PERMISSIONS.UPDATE],
    },
    {
      module: PROFILES.PROJECT_STATUS,
      permissions: [PERMISSIONS.UPDATE],
    },
    {
      module: PROFILES.USERS,
      permissions: [PERMISSIONS.READ],
    },
    {
      module: PROFILES.TEAMS,
      permissions: [],
    },
    {
      module: PROFILES.PROJECT_DOCS,
      permissions: [
        PERMISSIONS.READ,
        PERMISSIONS.UPLOAD,
        PERMISSIONS.DELETE,
        PERMISSIONS.DOWNLOAD,
      ],
    },
    {
      module: PROFILES.PROJECT_TEAMS,
      permissions: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.DELETE],
    },
    {
      module: PROFILES.PROJECT_USERS,
      permissions: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.DELETE],
    },
    {
      module: PROFILES.TEAM_STATS,
      permissions: [PERMISSIONS.READ],
    },
    {
      module: PROFILES.PROJECT_STATS,
      permissions: [PERMISSIONS.READ],
    },
    {
      module: PROFILES.USERS_STATS,
      permissions: [PERMISSIONS.READ],
    },
    {
      module: PROFILES.OVERVIEW,
      permissions: [PERMISSIONS.READ],
    },
  ],
};
