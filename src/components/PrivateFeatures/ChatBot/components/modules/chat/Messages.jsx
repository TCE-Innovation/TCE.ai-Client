import React from "react";

import Message from "./Message";

import { useMessage } from "../../../hooks";
import { Loader } from "../../common";

const Messages = () => {
  const { messages, loadingMessages } = useMessage();
  if (loadingMessages) {
    return <Loader size={5} />;
  }
  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};

export default Messages;
