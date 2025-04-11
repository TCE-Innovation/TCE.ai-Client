import { client } from "../http";
import { extractConversationData } from "../utils/data";

const route = "/user/conversations";

export const getConversations = async (projectId, userId) => {
  const queryParams = { project_id: projectId };
  if (userId) {
    queryParams.user_id = userId;
  }

  const { data, success, message } = await client.get(route, queryParams);
  if (success) {
    const conversations = data.map(extractConversationData);
    return { data: conversations, success: true };
  } else {
    return { data: null, success: false, message };
  }
};

export const createConversation = async (projectId) => {
  const { data, success, message } = await client.create(route, {
    query: { project_id: projectId },
  });
  if (success) {
    const { conversation_id } = data;
    return { data: conversation_id, success };
  } else {
    if (data?.error) {
      return {
        success,
        message: data.error,
      };
    }
    return {
      success,
      message,
    };
  }
};

export const deleteConversation = async (conversationId, projectId) => {
  const result = await client.remove(route, {
    query: { conversation_id: conversationId, project_id: projectId },
  });
  const { data, success, message } = result;
  if (success) {
    const { success: successMessage } = data || {
      success: "Conversation deleted successfully.",
    };
    return {
      success: true,
      message: successMessage,
    };
  }
  return {
    success: false,
    message,
  };
};

export const editConversation = async (params) => {
  const { conversationId, name, projectId } = params;
  const { data, success, message } = await client.update(route, {
    data: { name },
    query: { conversation_id: conversationId, project_id: projectId },
  });
  if (success) {
    const { success: successMessage } = data;
    return {
      success,
      message: successMessage,
    };
  }
  return {
    success,
    message,
  };
};
