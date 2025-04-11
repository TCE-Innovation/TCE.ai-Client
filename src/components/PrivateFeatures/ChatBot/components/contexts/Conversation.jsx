import React, {
  createContext,
  useContext as _useContext,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";

import useStorage from "../../hooks/useStorage";
import { useQueryParam } from "../../hooks";

import { useGetConversationsQuery } from "../../hooks/queries/";
import {
  useDeleteConversation,
  useEditConversation,
  useCreateConversation,
} from "../../hooks/mutations/";

const ConversationContext = createContext();

export const useContext = () => _useContext(ConversationContext);

const ConversationProvider = ({ children }) => {
  const {
    mutate: deleteConversationMutation,
    loading: isDeleting,
  } = useDeleteConversation();

  const {
    mutate: editConversationMutation,
    loading: isEditing,
  } = useEditConversation();

  const {
    mutate: createConversationMutation,
    data: newConversation,
    loading: isCreating,
  } = useCreateConversation();

  const [currentConversation, setCurrentConversation, reset] = useStorage(
    "CHATBOT_CURRENT_CONVERSATION",
    null
  );

  const [selectedProjectId, setSelectedProjectId] = useStorage("PROJECT_ID", 9);

  const query = useQueryParam();
  const { params } = query;
  const userId = params.user_id;

  const { data, loading, refetch } = useGetConversationsQuery(
    { projectId: selectedProjectId, userId },
    { disableRunOnMount: selectedProjectId === null }
  );

  const conversations = useMemo(() => data?.data || [], [data]);

  useLayoutEffect(() => {
    if (!currentConversation?.id || !conversations.length) return;
    if (parseInt(!currentConversation.id)) return reset();
    const isValid = conversations.some(
      (c) => c.id.toString() === currentConversation.id.toString()
    );
    if (!isValid) {
      reset();
    }
  }, [conversations, currentConversation, reset]);

  useEffect(() => {
    if (userId && selectedProjectId !== null) {
      refetch();
      reset();
    }
  }, [userId, selectedProjectId, refetch, reset]);

  const createConversation = async () => {
    if (isCreating) return;
    createConversationMutation({
      projectId: selectedProjectId,
    });
  };

  useEffect(() => {
    if (!newConversation) return;
    setCurrentConversation({
      id: newConversation.data,
      title: "New Title",
    });
    //eslint-disable-next-line
  }, [newConversation]);

  const editConversation = async ({ name, id }) => {
    if (isEditing || !id) return;
    editConversationMutation({
      conversationId: id,
      name,
      projectId: selectedProjectId,
    });
  };

  const deleteConversation = (id) => async (e) => {
    if (isDeleting || !id) return;
    e.stopPropagation();
    deleteConversationMutation({
      conversationId: id,
      projectId: selectedProjectId,
    });
    setCurrentConversation(null);
  };

  const handleSetCurrentConversation = (conversation) => {
    setCurrentConversation(conversation);
    if (userId) {
      query.push(
        {
          ...params,
          user_id: userId,
        },
        { replace: true }
      );
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversation,
        createConversation,
        deleteConversation,
        editConversation,
        setCurrentConversation: handleSetCurrentConversation, // Use our wrapped version
        loadingConversations: loading,
        isDeletingConversation: isDeleting,
        isCreatingConversation: isCreating,
        isEditingConversation: isEditing,
        selectedProjectId,
        setSelectedProjectId,
        clearConversation: reset,
        userId,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
