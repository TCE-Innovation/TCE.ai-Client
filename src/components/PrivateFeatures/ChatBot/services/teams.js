import { client } from "../http";
import { formatResponseData } from "../http/handlers";

import { formatTeam } from "../utils/data";

const route = "/user/teams";

export const getTeams = async () => {
  const { data, message, success } = await client.get(route);
  const _data = data.map(formatTeam);
  return {
    data: _data.reverse(),
    success,
    message,
  };
};

export const getTeamUsers = async ({ teamId }) => {
  const { data, message, success } = await client.get(route, {
    team_id: teamId,
  });
  const _data = formatTeam(data);
  return {
    data: _data,
    success,
    message,
  };
};

export const deleteTeam = async ({ teamId }) => {
  const result = await client.remove(route, {
    query: { team_id: teamId },
  });
  return formatResponseData(result);
};

export const createTeam = async ({ name, userIds }) => {
  const { data, ...result } = await client.create(route, {
    data: {
      team_name: name,
      user_ids: userIds,
    },
  });
  const { team_id: teamId, team_name: teamName, ...rest } = data;
  return formatResponseData({
    ...result,
    data: { ...rest, teamId, teamName, users: userIds },
  });
};

export const addUserToTeam = async ({ teamId, userId }) => {
  const result = await client.create(`${route}/users`, {
    data: {
      team_id: teamId,
      user_id: userId,
    },
  });
  return formatResponseData(result);
};

export const deleteUserFromTeam = async ({ teamId, userId }) => {
  const result = await client.remove(`${route}/users`, {
    data: {
      team_id: teamId,
      user_id: userId,
    },
  });
  return formatResponseData(result);
};

export const getTeamsByProject = async ({ projectId }) => {
  const { data, ...result } = await client.get(`${route}/projects`, {
    project_id: projectId,
  });
  const teams = data.teams.map((team) => ({
    ...team,
    teamName: team.name,
    users: (team.users || []).map((user) => ({
      ...user,
      url: user.image_url || null,
    })),
  }));
  return formatResponseData({ ...result, data: { teams } });
};

export const deleteTeamsFromProject = async ({ projectId, teamIds }) => {
  const { data, ...result } = await client.remove(`${route}/projects`, {
    data: {
      project_id: projectId,
      team_ids: teamIds,
    },
  });
  const { warning = null, ...rest } = data;
  return formatResponseData({ ...result, data: { ...rest, error: warning } });
};

export const addTeamsToUser = async ({ projectId, teamIds }) => {
  const { data, ...result } = await client.create(`${route}/projects`, {
    data: {
      project_id: projectId,
      team_ids: teamIds,
    },
  });
  const { warning = null, ...rest } = data;
  return formatResponseData({ ...result, data: { ...rest, error: warning } });
};
