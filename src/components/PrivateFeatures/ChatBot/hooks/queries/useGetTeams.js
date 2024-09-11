import { teamService } from "../../services";
import useQuery from "../useQuery";

export const useGetTeamsQuery = (options = {}) =>
  useQuery("getTeams", teamService.getTeams, options);
