import { teamService } from "../../services";
import useQuery from "../useQuery";

export const useGetTeamsByProjectQuery = ({ projectId }, options = {}) => {
  return useQuery(
    ["getTeams", { projectId }],
    () => teamService.getTeamsByProject({ projectId }),
    options
  );
};
