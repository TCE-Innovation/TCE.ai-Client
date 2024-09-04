import useQuery from "../useQuery";
import { conversationService } from "../../services";

export const useGetConversationsQuery = ({ projectId }, options = {}) => {
  return useQuery(
    ["getConversations", { projectId }],
    () => conversationService.getConversations(projectId),
    options
  );
};
