import React from "react";

import { SendIcon } from "../../../icons";

import Wrapper from "./style";

const ChatInput = () => {
  return (
    <Wrapper>
      <div className="input-container">
        <input placeholder="Type your message here" />
      </div>
      <button className="chat-button send-button tooltip-container">
        <SendIcon />
        <div className="tooltip align-top">Send Message</div>
      </button>
    </Wrapper>
  );
};

export default ChatInput;
