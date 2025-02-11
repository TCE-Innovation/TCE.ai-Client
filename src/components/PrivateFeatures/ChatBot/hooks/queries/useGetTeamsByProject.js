import { teamService } from "../../services";
import useQuery from "../useQuery";

export const useGetTeamsByProjectQuery = ({ projectId }, options = {}) => {
  return useQuery(
    ["getProjectTeams", { projectId }],
    () => teamService.getTeamsByProject({ projectId }),
    options
  );
};
