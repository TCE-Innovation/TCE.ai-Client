import { client } from "../http";
import { formatResponseData } from "../http/handlers";

import { formatTeam } from "../utils/data";

const route = "/user/teams";

export const getTeams = async () => {
  const { data, message, success } = await client.get(route);
  const _data = data.map(formatTeam);
  return {
    data: _data,
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
  const result = await client.remove(`${route}/users`, {
    query: { team_id: teamId },
  });
  return formatResponseData(result);
};

export const createTeam = async ({ name, userIds }) => {
  const { data, ...result } = await client.create(`${route}/users`, {
    data: {
      team_name: name,
      user_ids: userIds,
    },
  });
  const { team_id: teamId, ...rest } = data;
  return formatResponseData({ ...result, data: { ...rest, teamId } });
};
