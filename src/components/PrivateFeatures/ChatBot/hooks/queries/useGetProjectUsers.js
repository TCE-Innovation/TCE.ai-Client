import { projectService } from "../../services";
import useQuery from "../useQuery";

export const useGetProjectUsersQuery = ({ projectId }, options = {}) =>
  useQuery(
    ["getProjectUsers", { projectId }],
    () => projectService.getProjectUsers({ projectId }),
    options
  );
