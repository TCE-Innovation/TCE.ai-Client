import useQuery from "../useQuery";
import { messageService } from "../../services";

export const useGetMessagesQuery = ({ conversationId }, options = {}) => {
  return useQuery(
    ["getMessages", { conversationId }],
    () => messageService.getMessages(conversationId),
    options
  );
};
