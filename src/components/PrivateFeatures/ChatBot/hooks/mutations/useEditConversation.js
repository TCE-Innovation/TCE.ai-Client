import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { conversationService } from "../../services";
import useMutation from "../useMutation";

export const useEditConversation = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ conversationId, name, projectId }) => {
      argsRef.current = {
        conversationId,
        projectId,
        name,
      };
      return conversationService.editConversation({
        conversationId,
        projectId,
        name,
      });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery(
            ["getConversations", { projectId: argsRef.current.projectId }],
            (conversations) => {
              return {
                ...conversations,
                data: conversations.data.map((conversation) => {
                  if (conversation.id === argsRef.current.conversationId) {
                    return {
                      ...conversation,
                      title: argsRef.current.name,
                    };
                  }
                  return conversation;
                }),
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
