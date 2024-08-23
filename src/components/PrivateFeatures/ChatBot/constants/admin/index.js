export const PROFILES = {
  PROJECTS: Symbol("projects"),
  USERS: Symbol("users"),
  DOCUMENTS: Symbol("documents"),
  PROJECT_LIST: Symbol("project-list"),
  PROJECT_NAME: Symbol("project-name"),
  PROJECT_USERS: Symbol("project-users"),
  PROJECT_DOCS: Symbol("project-documents"),
  LIVE_MODE: Symbol("live-mode"),
  PROPOSAL_MODE: Symbol("proposal-mode"),
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
