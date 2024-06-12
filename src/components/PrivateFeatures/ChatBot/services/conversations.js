import { client } from "../http";

// const route = "/conversations";
const route = "/user/conversations";

// export const getConversations = async (projectId = 9) => {
//   const { data, success, message } = await client.get(`${route}/${projectId}`);
//   if (success) {
//     return { data, success: true };
//   } else {
//     return { data: null, success: false, message };
//   }
// };

export const getConversations = async () => {
  const { data, success, message } = await client.get(route);
  if (success) {
    return { data, success: true };
  } else {
    return { data: null, success: false, message };
  }
};

// export const createConversation = async (projectId = 9) => {
//   const { data, success } = await client.create(`${route}/${projectId}`);
//   if (success) {
//     const { conversation_id } = data;
//     return conversation_id;
//   } else {
//     return null;
//   }
// };

export const createConversation = async () => {
  const { data, success } = await client.create(route);
  if (success) {
    const { conversation_id } = data;
    return conversation_id;
  } else {
    return null;
  }
};

export const deleteConversation = async (conversationId) => {
  const result = await client.remove(route, {
    query: { conversation_id: conversationId },
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
