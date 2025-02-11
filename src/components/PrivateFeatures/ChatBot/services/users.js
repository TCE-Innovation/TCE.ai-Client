import { client } from "../http";
import { formatResponseData } from "../http/handlers";

import { sortArray } from "../utils/date";
import { extractUserData } from "../utils/data";

const route = "/user/users";

export const getUsers = async () => {
  const { data, message, success } = await client.get(route);
  const sorted = sortArray(data, "created_at");
  const _data = sorted.map(extractUserData);
  return {
    data: _data,
    success,
    message,
  };
};

export const deleteUser = async ({ userId }) => {
  const result = await client.remove(route, {
    query: { user_id: userId },
  });
  return formatResponseData(result);
};

export const addUser = async ({ userData }) => {
  const { data, ...result } = await client.create(route, {
    data: {
      name: userData.name,
      role: userData.role,
      email: userData.email,
    },
  });
  const { user, ...rest } = data;
  const _data = extractUserData(user);
  return formatResponseData({ ...result, data: { ...rest, user: _data } });
};

export const getUnlistedUsers = async ({ projectId }) => {
  const { data, success } = await client.get(route, {
    project_id: projectId,
  });
  const sorted = sortArray(data, "created_at");
  const _data = sorted.map(extractUserData);
  return {
    data: _data,
    success,
  };
};

export const editUser = async ({ userId, role }) => {
  const { data, ...result } = await client.update(route, {
    data: {
      user_id: userId,
      role,
    },
  });
  const { message = "", ...rest } = data;
  return formatResponseData({
    ...result,
    message: result.message || message,
    data: { ...rest },
  });
};

export const getUserProjects = async () => {
  const result = await client.get(`${route}/projects`);
  const data = formatResponseData(result);
  return data;
};
