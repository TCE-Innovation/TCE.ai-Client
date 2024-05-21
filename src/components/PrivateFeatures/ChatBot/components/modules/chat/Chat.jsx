import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput";
import ChatMessages from "./Messages";

import { useMessage, useScroll } from "../../../hooks";

const Chat = () => {
  const { messages, loadingMessages } = useMessage();

  const { containerRef, scrollIntoView } = useScroll();

  return (
    <Wrapper>
      {!loadingMessages && !messages.length && (
        <>
          <h1 className="welcome-text">
            <span>Hello,</span>
            <br />
            <span>How can I help you today?</span>
          </h1>
        </>
      )}
      <div ref={containerRef} className="messages-container">
        <ChatMessages />
      </div>
      <div className="message-input-container">
        <ChatInput />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  border: 1px solid var(--chatbot-grey);
  border-radius: 1em;
  background-color: var(--chatbot-background);
  flex-direction: column;
  padding: 1.5em;
  height: 100%;
  gap: 1em;
  .welcome-text {
    font-size: 3.5em;
    font-weight: bolder;
    & span:last-child {
      color: var(--chatbot-grey);
    }
  }
  .messages-container {
    overflow: hidden auto;
    flex: 1;
    position: relative;
  }
  .message-input-container {
    margin-top: auto;
    & input {
      background-color: transparent;
      width: 100%;
      border: none;
      outline: none;
    }
  }
`;

export default Chat;
