import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { conversationService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteConversation = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ conversationId, projectId }) => {
      argsRef.current = {
        conversationId,
        projectId,
      };
      return conversationService.deleteConversation(conversationId, projectId);
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery(
            ["getConversations", { projectId: argsRef.current.projectId }],
            (conversations) => {
              return {
                ...conversations,
                data: conversations.data.filter(
                  (conversation) =>
                    conversation.id !== argsRef.current.conversationId
                ),
              };
            }
          );
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
