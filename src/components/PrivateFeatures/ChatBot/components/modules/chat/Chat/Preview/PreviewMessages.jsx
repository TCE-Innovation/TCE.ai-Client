import React from "react";

import Message from "../../Message/Message";

import { useMessage } from "../../../../../hooks";
import { Loader } from "../../../../common";

const PreviewMessages = () => {
  const { messages, loadingMessages } = useMessage();
  if (loadingMessages) {
    return <Loader size={5} />;
  }
  return (
    <div>
      {messages.map((message, i) => {
        return (
          <Message
            key={message.id}
            {...message}
            showTypeWriterEffect={false}
            showfeedbackbuttons={false}
          />
        );
      })}
    </div>
  );
};

export default PreviewMessages;
