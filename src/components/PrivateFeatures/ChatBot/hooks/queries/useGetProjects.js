import useQuery from "../useQuery";
import { projectService } from "../../services";

export const useGetProjectsQuery = (options = {}) => {
  return useQuery("getProjects", projectService.getProjects, options);
};
