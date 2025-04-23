import React, { useState, useRef } from "react";
import { SendIcon } from "../../../icons";
import { useChat } from "../../../contexts/Conversation";
import Wrapper from "./style";

const ChatInput = () => {
  const { currentProject, loading, sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const isDisabled =
    !currentProject ||
    loading.projects ||
    loading.conversations ||
    loading.messages;

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitMessageHandler();
    }
  };

  const submitMessageHandler = async () => {
    if (isDisabled || !message.trim()) return;
    const tempMessage = message;
    setMessage("");
    await sendMessage(tempMessage);
    if (inputRef.current) inputRef.current.blur();
  };

  return (
    <Wrapper tabIndex={0}>
      <div className="chatbot-input-container">
        <input
          ref={inputRef}
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
