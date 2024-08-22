import { userService } from "../../services";
import useQuery from "../useQuery";

export const useGetUsersQuery = (options = {}) =>
  useQuery("getUsers", userService.getUsers, options);
