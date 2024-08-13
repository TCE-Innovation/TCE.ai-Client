import { client } from "../http";

const route = "/user/add_message_feedback";

export const sendFeedback = async (payload) => {
  const { messageId, feedback } = payload;
  const { data, success, message } = await client.create(route, {
    data: { message_id: messageId, feedback },
  });
  if (data?.error) {
    console.error(data.error);
    return {
      success,
      message: data.error,
    };
  }
  return {
    success,
    message,
  };
};
