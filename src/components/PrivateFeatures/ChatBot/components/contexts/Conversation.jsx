import React, {
  createContext,
  useContext as _useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

import { conversationService } from "../../services";
import useStorage from "../../hooks/useStorage";
import useGlobal from "../../hooks/useGlobal";

const ConversationContext = createContext();

export const useContext = () => _useContext(ConversationContext);

const ConversationProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation, reset] = useStorage(
    "CHATBOT_CURRENT_CONVERSATION",
    null
  );

  const { createAlert } = useGlobal();

  useLayoutEffect(() => {
    if (!currentConversation || !conversations.length) return;
    const isValid = conversations.some(
      (c) => c.id.toString() === currentConversation.toString()
    );
    if (!isValid) {
      reset();
    }
  }, [conversations, currentConversation, reset]);

  const createConversation = async () => {
    if (loading || isCreating) return;
    setIsCreating(true);
    const conversationId = await conversationService.createConversation();
    setIsCreating(false);
    if (!conversationId) return;
    setConversations((prev) => [
      { title: "New Chat", id: conversationId },
      ...prev,
    ]);
    setCurrentConversation(conversationId);
  };

  useEffect(() => {
    const getAllConversations = async () => {
      const {
        data: conversations,
        success,
        message,
      } = await conversationService.getConversations();
      if (!success) {
        createAlert({ message, type: "danger" });
      }
      if (conversations) {
        setConversations(
          conversations.map((c) => ({
            title: c.name,
            id: c.conversation_id,
          }))
        );
      }
      setLoading(false);
    };
    getAllConversations();
  }, [createAlert]);

  const deleteConversation = (id) => async (e) => {
    if (isDeleting) return;
    e.stopPropagation();
    setIsDeleting(true);
    const { message } = await conversationService.deleteConversation(id);
    createAlert({ message, type: "danger" });
    setIsDeleting(false);
    const target = conversations.find((c) => c.id !== id)?.id || null;
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setCurrentConversation(target);
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversation,
        createConversation,
        deleteConversation,
        setCurrentConversation,
        loadingConversations: loading,
        isDeletingConversation: isDeleting,
        isCreatingConversation: isCreating,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
