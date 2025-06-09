import React, {
  createContext,
  useContext as _useContext,
  useMemo,
  useEffect,
} from "react";

import { genRandomId } from "../../utils/uuid";

import useConversation from "../../hooks/useConversation";
import { useGetMessagesQuery } from "../../hooks/queries/";
import { useCreateMessage } from "../../hooks/mutations/";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const {
    currentConversation,
    clearConversation,
    selectedProjectId,
    conversations,
    userId,
    createConversation,
  } = useConversation();
  const {
    mutate: createMessageHandler,
    loading: sendingMessage,
  } = useCreateMessage();

  const {
    data,
    loading,
    updateData: updateMessages,
    reset,
  } = useGetMessagesQuery(
    { conversationId: currentConversation?.id, userId },
    {
      disableRunOnMount:
        !currentConversation ||
        isNaN(currentConversation?.id) ||
        selectedProjectId === null ||
        !conversations.length,
    }
  );

  const messages = useMemo(() => data?.data?.messages || [], [data]);

  const initialMessageCount = useMemo(() => {
    return data?.data?.size || 0;
  }, [data]);

  const setMessages = (value) => {
    updateMessages((prev) => ({
      ...prev,
      data: typeof value === "function" ? value(prev.data) : value,
    }));
  };

  const createMessage = ({ isAI, body, id, citations }) => {
    if (!currentConversation?.id) return;
    const newMessage = { isAI, body, id };
    if (isAI && citations) newMessage.citations = citations;

    setMessages((prev) => {
      return {
        ...prev,
        messages: [...(prev?.messages || []), newMessage],
      };
    });
  };

  useEffect(() => {
    return () => {
      setMessages((prev) => ({
        ...prev,
        size: prev?.messages?.length || 0,
      }));
    };
    // eslint-disable-next-line
  }, [currentConversation?.id]);

  const clearMessageCache = () => {
    setMessages([]);
    reset();
    clearConversation();
  };

  const sendMessage = async (message) => {
    let conversationId = currentConversation?.id;
    // If no conversation, create one first
    if (!conversationId) {
      await createConversation();
      // Wait for currentConversation to be set
      // Poll for a short time (max 1s)
      let waited = 0;
      while (!conversationId && waited < 1000) {
        await new Promise((res) => setTimeout(res, 50));
        conversationId = currentConversation?.id;
        waited += 50;
      }
      if (!conversationId) return; // fail gracefully
    }
    createMessage({ isAI: false, body: message, id: genRandomId() });
    createMessageHandler({
      conversationId,
      message,
    });
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        sendMessage,
        clearMessageCache,
        loadingMessages: loading,
        sendingMessage,
        createMessage,
        initialMessageCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useContext = () => _useContext(MessageContext);

export default MessageProvider;
