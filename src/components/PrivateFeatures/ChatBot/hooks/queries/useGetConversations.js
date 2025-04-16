import useQuery from "../useQuery";
import { conversationService } from "../../services";

export const useGetConversationsQuery = (
  { projectId, userId },
  options = {}
) => {
  return useQuery(
    ["getConversations", { projectId, userId }],
    () => conversationService.getConversations(projectId, userId),
    options
  );
};
