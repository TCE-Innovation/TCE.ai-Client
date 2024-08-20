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

  const [selectedProjectId, setSelectedProjectId] = useStorage("PROJECT_ID", 9);

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
    } = await conversationService.createConversation(selectedProjectId);
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
      projectId: selectedProjectId,
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
    if (!selectedProjectId) return;
    const getAllConversations = async (projectId) => {
      const {
        data: conversations,
        success,
        message,
      } = await conversationService.getConversations(projectId);
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
    getAllConversations(selectedProjectId);
  }, [selectedProjectId, createAlert]);

  const deleteConversation = (id) => async (e) => {
    if (isDeleting) return;
    e.stopPropagation();
    setIsDeleting(true);
    const { message } = await conversationService.deleteConversation(
      id,
      selectedProjectId
    );
    createAlert({ message, type: "danger" });
    setIsDeleting(false);
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setCurrentConversation(null);
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
        selectedProjectId,
        setSelectedProjectId,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
