import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { messageService } from "../../services";
import useMutation from "../useMutation";

export const useCreateMessage = () => {
  const { createAlert } = useGlobal();
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
          return updateQuery(
            [
              "getMessages",
              {
                conversationId: argsRef.current.conversationId,
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
