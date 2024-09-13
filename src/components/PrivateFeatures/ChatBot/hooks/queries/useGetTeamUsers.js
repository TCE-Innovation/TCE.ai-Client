import { teamService } from "../../services";
import useQuery from "../useQuery";

export const useGetTeamUsersQuery = ({ teamId }, options = {}) => {
  return useQuery(
    ["getTeamUsers", { teamId }],
    () => teamService.getTeamUsers({ teamId }),
    options
  );
};
