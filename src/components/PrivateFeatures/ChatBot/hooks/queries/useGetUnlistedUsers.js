import { userService } from "../../services";
import useQuery from "../useQuery";

export const useGetUnlistedUsersQuery = ({ projectId }, options = {}) =>
  useQuery(
    ["getUnlistedUsers", { projectId }],
    () => userService.getUnlistedUsers({ projectId }),
    options
  );
