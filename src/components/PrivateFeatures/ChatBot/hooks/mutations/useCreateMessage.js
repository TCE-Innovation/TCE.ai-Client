import { useRef } from "react";
import { useGlobal, useConversation } from "../../hooks";
import { messageService } from "../../services";
import useMutation from "../useMutation";

export const useCreateMessage = () => {
  const { createAlert } = useGlobal();
  const { userId } = useConversation();
  const argsRef = useRef();

  return useMutation(
    ({ conversationId, message }) => {
      argsRef.current = {
        conversationId,
      };
      return messageService.createMessage({ conversationId, message });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          const newMessage = newData.data;
          updateQuery(
            [
              "getMessages",
              {
                conversationId: argsRef.current.conversationId,
                userId,
              },
            ],
            (messages) => {
              return {
                ...messages,
                data: {
                  ...messages.data,
                  messages: [...messages.data.messages, newMessage],
                },
              };
            }
          );
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
