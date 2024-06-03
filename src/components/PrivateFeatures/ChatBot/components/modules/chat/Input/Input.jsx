import React, { useState } from "react";

import { SendIcon } from "../../../icons";

import { useMessage, useConversation } from "../../../../hooks";

import Wrapper from "./style";

const ChatInput = () => {
  const { loadingMessages, sendMessage, sendingMessage } = useMessage();
  const {
    conversations,
    currentConversation,
    loadingConversations,
    isCreatingConversation,
  } = useConversation();
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitMessageHandler();
    }
  };

  const isDisabled =
    !conversations.length ||
    !currentConversation ||
    loadingMessages ||
    sendingMessage ||
    loadingConversations ||
    isCreatingConversation;

  const submitMessageHandler = () => {
    if (isDisabled) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <Wrapper tabIndex={0}>
      <div className="input-container">
        <input
          value={message}
          disabled={isDisabled}
          onChange={handleInput}
          placeholder="Type your message here"
          readOnly={isDisabled}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className="chat-button send-button tooltip-container"
        onClick={submitMessageHandler}
        disabled={isDisabled}
      >
        <SendIcon />
        <div className="tooltip align-top">Send Message</div>
      </button>
    </Wrapper>
  );
};

export default ChatInput;
