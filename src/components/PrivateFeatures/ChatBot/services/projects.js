import { client } from "../http";
import { formatResponseData } from "../http/handlers";
import { sortArray } from "../utils/date";
import { extractUserData } from "../utils/data";

const route = "/user/projects";

export const getProjects = async () => {
  const { data, message, success } = await client.get(route);
  const _data = data.map((item) => {
    return {
      ...item,
      name: item.name,
      userCount: item.user_count,
      documentCount: item.document_count,
      id: item.id,
      isLive: item.is_live,
    };
  });
  return { data: _data, success, message };
};

export const editProject = async ({ projectId, name }) => {
  const result = await client.update(route, {
    data: { name },
    query: {
      project_id: projectId,
    },
  });
  return formatResponseData(result);
};

export const editProjectStatus = async ({ projectId, isLive }) => {
  const result = await client.update(route, {
    data: { status: isLive.toString() },
    query: {
      project_id: projectId,
    },
  });
  return formatResponseData(result);
};

/**
 *
 * @example Response
 * {
    "success": "Project Created Successfully",
    "project": {
        "id": 19,
        "name": "test new new project",
        "is_live": false,
        "created_at": "2024-08-22T04:43:32.661973Z"
    }
}
 *
 */
export const createProject = async ({ name }) => {
  const { data, ...result } = await client.create(route, {
    data: { name },
  });
  const { project, ...rest } = data;
  const _data = {
    ...project,
    userCount: 0,
    documentCount: 0,
  };
  return formatResponseData({ ...result, data: { ...rest, project: _data } });
};

export const deleteProject = async ({ projectId }) => {
  const result = await client.remove(route, {
    query: { project_id: projectId },
  });
  return formatResponseData(result);
};

export const addUserToProject = async ({ projectId, userId }) => {
  const result = await client.create(`${route}/users`, {
    query: { project_id: projectId, user_id: userId },
  });
  return formatResponseData(result);
};

/**
 *
 * @example Response
 * [
    {
        "id": 77,
        "email": "pmeyer@tcelect.net",
        "first_name": "",
        "last_name": "",
        "role": "User",
        "added_to_project": true
    },
    {
        "id": 90,
        "email": "test+2@test.com",
        "first_name": "TEEst",
        "last_name": "Test",
        "role": "Project Manager",
        "added_to_project": true
    }
]
 *
 */
export const addUsersToProjects = async ({ projectIds, userIds }) => {
  const { data, ...result } = await client.create(`${route}/users`, {
    data: {
      project_ids: projectIds,
      user_ids: userIds,
    },
  });
  const { added_users = [], ...rest } = data;
  const _data = sortArray(added_users, "created_at").map(extractUserData);
  return formatResponseData({
    ...result,
    data: { users: _data, ...rest },
  });
};

export const getProjectUsers = async ({ projectId }) => {
  const { data, success } = await client.get(`${route}/users`, {
    project_id: projectId,
  });
  const _data = sortArray(data, "created_at").map(extractUserData);
  return {
    data: _data,
    success,
  };
};

export const removeUserFromProject = async ({ projectId, userId }) => {
  const result = await client.remove(`${route}/users`, {
    query: { project_id: projectId, user_id: userId },
  });
  return formatResponseData(result);
};
