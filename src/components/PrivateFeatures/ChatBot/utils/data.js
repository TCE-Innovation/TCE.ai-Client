import { ROLES } from "../constants/admin";

export const extractUserData = (item) => {
  const name = [item.first_name, item.last_name].join(" ").trim();
  return {
    ...item,
    name: name || item.name,
    email: item.email,
    role: item.role,
    id: item.id,
    url: "",
  };
}

export const extractDocumentData = (item) => ({
  ...item,
  name: item.document_name,
  uploadDate: item.created_at,
  id: item.document_id,
})

export const getRoleById = (id) => {
  const roleIds = [ROLES.ADMIN, ROLES.PM, ROLES.USER];
  return roleIds[id % roleIds.length];
};
