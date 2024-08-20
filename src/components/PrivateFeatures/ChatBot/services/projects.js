import { client } from "../http";

const route = "/user/projects";

export const getProjects = async () => {
  return await client.get(route);
};

export const editProject = async ({ projectId, name }) => {
  return client.update(route, {
    data: { name },
    query: {
      project_id: projectId,
    },
  });
};

export const createProject = async ({ name }) => {
  return client.create(route, {
    data: { name },
  });
};

export const deleteProject = ({ projectId }) => {
  const { data } = client.remove(route, { query: { project_id: projectId } });
  if (data?.error) {
    return {
      success: false,
      message: data.error,
    };
  }
  if (data?.success) {
    return {
      success: true,
      message: data.success,
    };
  }
};

export const addUserToProject = async ({ projectId, userId }) => {
  const { data, success, message } = await client.create(route, {
    query: { project_id: projectId, user_id: userId },
  });
  if (data?.error) {
    return {
      success: false,
      message: data.error,
    };
  }
  if (success) {
    return {
      success,
      message: "user successfully added to project",
    };
  }
  return {
    success,
    message,
  };
};

export const addUsersToProject = async ({ projectId, userIds }) => {
  const { data, success, message } = await client.create(route, {
    query: { project_id: projectId, user_ids: userIds },
  });
  if (data?.error) {
    return {
      success: false,
      message: data.error,
    };
  }
  if (success) {
    return {
      success,
      message: "user(s) successfully added to project",
    };
  }
  return {
    success,
    message,
  };
};

export const getProjectUsers = async ({ projectId }) => {
  const { data, success } = await client.get(`${route}/users`, {
    project_id: projectId,
  });
  return {
    data,
    success,
  };
};

export const removeUserFromProject = async ({ projectId, userId }) => {
  const { data, success, message } = await client.remove(`${route}/users`, {
    query: { project_id: projectId, user_id: userId },
  });
  if (data?.success) {
    return {
      success: true,
      message: data.message,
    };
  }
  return {
    success,
    message,
  };
};
