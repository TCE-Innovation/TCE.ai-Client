export const PROFILES = {
  PROJECTS: Symbol("projects"),
  USERS: Symbol("users"),
  USERS_STATS: Symbol("users-statistics"),
  DOCUMENTS: Symbol("documents"),
  TEAMS: Symbol("teams"),
  TEAM_USERS: Symbol("team-users"),
  TEAM_STATS: Symbol("team-statistics"),
  PROJECT_LIST: Symbol("project-list"),
  PROJECT_NAME: Symbol("project-name"),
  PROJECT_USERS: Symbol("project-users"),
  PROJECT_DOCS: Symbol("project-documents"),
  PROJECT_STATS: Symbol("project-statistics"),
  PROJECT_TEAMS: Symbol("project-teams"),
  LIVE_MODE: Symbol("live-mode"),
  PURSUIT_MODE: Symbol("pursuit-mode"),
  OVERVIEW: Symbol("overview"),
  PROJECT_STATUS: Symbol("project-status"),
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
