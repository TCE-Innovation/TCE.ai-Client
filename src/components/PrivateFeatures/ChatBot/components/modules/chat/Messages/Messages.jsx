import React from "react";

import Message from "../Message/Message";

import { useMessage } from "../../../../hooks";
import { Loader } from "../../../common";

import { BotLoadingIcon } from "../../../icons";

const Messages = () => {
  const {
    messages,
    loadingMessages,
    sendingMessage,
    initialMessageCount,
  } = useMessage();
  if (loadingMessages) {
    return <Loader size={5} />;
  }
  return (
    <div>
      {messages.map((message, i, arr) => {
        return (
          <Message
            key={message.id}
            {...message}
            showTypeWriterEffect={
              message.isAI && i === arr.length - 1 && i > initialMessageCount
            }
            initialShowCitations={
              message.isAI && i === arr.length - 1 && i <= initialMessageCount
            }
          />
        );
      })}
      {sendingMessage && (
        <Message
          isAI={true}
          body={<BotLoadingIcon width={"3em"} height={"3em"} />}
          showfeedbackbuttons={false}
        />
      )}
    </div>
  );
};

export default Messages;
