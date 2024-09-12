import { teamService } from "../../services";
import useQuery from "../useQuery";

export const useGetTeamUsersQuery = ({ teamId }, options = {}) => {
  return useQuery(
    ["getTeams", { teamId }],
    () => teamService.getTeamUsers({ teamId }),
    options
  );
};
