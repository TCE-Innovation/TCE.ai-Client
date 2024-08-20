import { client } from "../http";

const route = "/user/users";

export const getUsers = async () => {
  return client.get(route);
};

export const deleteUser = async ({ userId }) => {
  const { data, message, success } = await client.remove(route, {
    query: { user_id: userId },
  });
  if (data.success) {
    return {
      success: true,
      message: data.sucess,
    };
  }
  return {
    success,
    message,
  };
};

export const addUser = async ({ userData }) => {
  return await client.create(route, { data: { userData } });
};
