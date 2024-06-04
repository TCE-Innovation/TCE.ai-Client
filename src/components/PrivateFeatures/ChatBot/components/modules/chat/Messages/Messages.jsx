import React from "react";

import Message from "../Message/Message";

import { useMessage } from "../../../../hooks";
import { Loader } from "../../../common";

import { BotLoadingIcon } from "../../../icons";

const Messages = () => {
  const { messages, loadingMessages, sendingMessage } = useMessage();
  if (loadingMessages) {
    return <Loader size={5} />;
  }
  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
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
