import { client } from "../http";
import { formatMessage, formatCitations } from "../utils/data";

const route = "/user/messages";

export const getMessages = async ({ conversationId, userId }) => {
  const queryParams = { conversation_id: conversationId };
  if (userId) {
    queryParams.user_id = userId;
  }

  const { data, success, message } = await client.get(route, queryParams);
  if (success) {
    if (!Array.isArray(data))
      return { data: null, success: false, message: "invalid response!" };
    const messages = data.map(formatMessage);
    return {
      data: {
        messages,
        size: messages.length,
      },
      success,
    };
  } else {
    return {
      data: null,
      success,
      message,
    };
  }
};

export const createMessage = async (payload) => {
  const { conversationId, message } = payload;
  const { success, data, message: responseMessage } = await client.create(
    route,
    {
      data: { message },
      query: { conversation_id: conversationId },
    }
  );
  if (success) {
    const { ai_response, citations, message_id } = data;
    return {
      success,
      data: {
        isAI: true,
        body: ai_response,
        citations: formatCitations(citations || []),
        id: message_id,
      },
      message: responseMessage,
    };
  } else {
    return {
      success,
      data: null,
      message: responseMessage,
    };
  }
};
