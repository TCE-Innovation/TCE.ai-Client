import useQuery from "../useQuery";
import { messageService } from "../../services";

export const useGetMessagesQuery = (
  { conversationId, userId },
  options = {}
) => {
  return useQuery(
    ["getMessages", { conversationId, userId }],
    () => messageService.getMessages({ conversationId, userId }),
    options
  );
};
