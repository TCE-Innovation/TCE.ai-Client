import { client } from "../http";
import { genRandomId } from "../utils/uuid";

const route = "/user/messages";

const formatCitations = (citations) => {
  return citations.map((c) => ({
    highlightedText: c.highlighted_text,
    pageNumber: c.page_number,
    title: c.title,
    url: c.url,
    id: genRandomId(),
  }));
};

export const getMessages = async (conversationId) => {
  const { data, success, message } = await client.get(route, {
    conversation_id: conversationId,
  });
  if (success) {
    const parseMessage = (message) => {
      const isUser = message.user || null;
      if (!isUser) {
        const { bot, message_id } = message;
        const { ai_response, citations } = bot;
        return {
          isAI: true,
          body: ai_response,
          id: message_id,
          citations: formatCitations(citations),
        };
      } else {
        const { user, message_id } = message;
        return {
          isAI: false,
          body: user,
          id: message_id,
        };
      }
    };
    if (!Array.isArray(data))
      return { data: null, success: false, message: "invalid response!" };
    return {
      data: data.map(parseMessage),
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
  const {
    success,
    data,
    message: responseMessage,
  } = await client.create(route, {
    data: { message },
    query: { conversation_id: conversationId },
  });
  if (success) {
    const { ai_response, citations, message_id } = data;
    return {
      success,
      data: {
        message: ai_response,
        citations: formatCitations(citations),
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
