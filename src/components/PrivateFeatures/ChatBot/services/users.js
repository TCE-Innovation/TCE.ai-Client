import { client } from "../http";
import { formatResponseData } from "../http/handlers";

import { sortArray } from "../utils/date";

const route = "/user/users";

const extractUser = (item) => {
  const name = [item.first_name, item.last_name].join(" ").trim();
  return {
    ...item,
    name,
    email: item.email,
    role: item.role,
    id: item.id,
    url: "",
  };
};

export const getUsers = async () => {
  const { data, message, success } = await client.get(route);
  const sorted = sortArray(data, "created_at");
  const _data = sorted.map(extractUser);
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
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: userData.role,
      email: userData.email,
    },
  });
  const { user, ...rest } = data;
  const _data = extractUser(user);
  return formatResponseData({ ...result, data: { ...rest, user: _data } });
};

export const getUnlistedUsers = async ({ projectId }) => {
  const { data, success } = await client.get(route, {
    project_id: projectId,
  });
  const sorted = sortArray(data, "created_at");
  const _data = sorted.map(extractUser);
  return {
    data: _data,
    success,
  };
};
