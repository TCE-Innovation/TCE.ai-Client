export const PROFILES = {
  PROJECTS: Symbol("projects"),
  USERS: Symbol("users"),
  DOCUMENTS: Symbol("documents"),
  TEAMS: Symbol("teams"),
  TEAM_USERS: Symbol("team-users"),
  PROJECT_LIST: Symbol("project-list"),
  PROJECT_NAME: Symbol("project-name"),
  PROJECT_USERS: Symbol("project-users"),
  PROJECT_DOCS: Symbol("project-documents"),
  PROJECT_TEAMS: Symbol("project-teams"),
  LIVE_MODE: Symbol("live-mode"),
  PURSUIT_MODE: Symbol("pursuit-mode"),
};

export const ROLES = {
  ADMIN: "Admin",
  PM: "Project Manager",
  USER: "User",
};

export const ROLE_TO_COLORS = {
  [ROLES.ADMIN]: "purple",
  [ROLES.PM]: "blue",
  [ROLES.USER]: "green",
};
