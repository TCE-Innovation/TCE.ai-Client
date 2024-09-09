import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { conversationService } from "../../services";
import useMutation from "../useMutation";

export const useCreateConversation = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef();

  return useMutation(
    ({ projectId }) => {
      argsRef.current = {
        projectId,
      };
      return conversationService.createConversation(projectId);
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          const conversationId = newData.data;
          updateQuery(
            ["getConversations", { projectId: argsRef.current.projectId }],
            (conversations) => {
              return {
                ...conversations,
                data: [
                  { title: "New Chat", id: conversationId },
                  ...conversations.data,
                ],
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
