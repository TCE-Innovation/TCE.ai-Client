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
  const [isEditing, setIsEditing] = useState(false);

  const [conversations, setConversations] = useState([]);

  const [currentConversation, setCurrentConversation, reset] = useStorage(
    "CHATBOT_CURRENT_CONVERSATION",
    null
  );

  const { createAlert } = useGlobal();

  useLayoutEffect(() => {
    if (!currentConversation || !conversations.length) return;
    if (parseInt(currentConversation)) return reset();
    const isValid = conversations.some(
      (c) => c.id.toString() === currentConversation.id.toString()
    );
    if (!isValid) {
      reset();
    }
  }, [conversations, currentConversation, reset]);

  const createConversation = async () => {
    if (loading || isCreating) return;
    setIsCreating(true);
    const {
      data: conversationId,
      success,
      message,
    } = await conversationService.createConversation();
    setIsCreating(false);
    if (!success || !conversationId)
      return createAlert({ message, type: "danger" });
    const newConversationObject = { title: "New Chat", id: conversationId };
    setConversations((prev) => [newConversationObject, ...prev]);
    setCurrentConversation({ ...newConversationObject });
  };

  const editConversation = async ({ name, id }) => {
    if (isEditing || !currentConversation) return;
    setIsEditing(true);
    const { success, message } = await conversationService.editConversation({
      conversationId: currentConversation.id,
      name,
    });
    createAlert({ message, type: success ? "info" : "danger" });
    setIsEditing(false);
    if (!success) return;
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id === id) {
          return {
            ...conversation,
            title: name,
          };
        }
        return conversation;
      })
    );
    if (id === currentConversation.id) {
      setCurrentConversation({ ...currentConversation, title: name });
    }
  };

  useEffect(() => {
    const getAllConversations = async () => {
      const {
        data: conversations,
        success,
        message,
      } = await conversationService.getConversations();
      if (!success) {
        createAlert({ message: message, type: "danger" });
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
    const target = conversations.find((c) => c.id !== id) || null;
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
        editConversation,
        setCurrentConversation,
        loadingConversations: loading,
        isDeletingConversation: isDeleting,
        isCreatingConversation: isCreating,
        isEditingConversation: isEditing,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
