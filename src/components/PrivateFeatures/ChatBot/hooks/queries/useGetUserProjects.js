import { userService } from "../../services";
import useQuery from "../useQuery";

export const useGetUserProjectsQuery = ({ userId }, options = {}) =>
  useQuery(
    ["getUserProjects", { userId }],
    () => userService.getUserProjects(),
    options
  );
