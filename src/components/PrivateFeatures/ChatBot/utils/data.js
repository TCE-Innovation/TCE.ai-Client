import { ROLES } from "../constants/admin";
import { genRandomId } from "./uuid";

export const genProject = async () => {
  const userCount = 10;
  const users = await genUser(userCount);
  const alphs = "abcdefghijklmnopqrstuvqxyz";
  return Array.from({ length: 20 }, (_, i) => {
    const id = genRandomId();
    return {
      id,
      name: `${alphs[i].toUpperCase()} Project`,
      assignedUsers: users.map((user) => ({
        name: user.name,
        url: user.image,
      })),
      documentCount: alphs.charCodeAt(i),
    };
  });
};

export const genUser = async (size) => {
  const { results } = await (await fetch(
    `https://randomuser.me/api/?results=${size}`
  )).json();
  return results.map((result) => ({
    name: [result.name.first, result.name.last].join(" "),
    email: result.email,
    image: result.picture.medium,
  }));
};

export const genDocuments = (length = 20) => {
  return Array.from({ length }, (_, i) => {
    const date = new Date().setMonth(new Date().getMonth() - 2);
    return {
      name: `${i + 1} Document name`,
      uploadDate: new Date(new Date(date).setDate(i + 1)).toISOString(),
      size: "2 MB",
      documentType: "PDF",
    };
  });
};

export const getRoleById = (id) => {
  const roleIds = [ROLES.ADMIN, ROLES.PM, ROLES.USER];
  return roleIds[id % roleIds.length];
};
