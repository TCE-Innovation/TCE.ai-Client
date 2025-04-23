import React from "react";
import Message from "../../Message/Message";
import { useChat } from "../../../../contexts/Conversation";
import { Loader } from "../../../common";

const PreviewMessages = () => {
  const { messages, loading } = useChat();
  if (loading.messages) {
    return <Loader size={5} />;
  }
  return (
    <div>
      {messages.map((message, i) => (
        <Message
          key={message.id}
          {...message}
          showTypeWriterEffect={false}
          showfeedbackbuttons={false}
          initialShowCitation={true}
        />
      ))}
    </div>
  );
};

export default PreviewMessages;
