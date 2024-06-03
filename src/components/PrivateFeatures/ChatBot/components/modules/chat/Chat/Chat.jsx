import React, { useLayoutEffect } from "react";

import ChatInput from "../Input/Input";
import ChatMessages from "../Messages/Messages";

import { useMessage, useScroll } from "../../../../hooks";

import Wrapper from "./style";
import { Alerts } from "../../../common";

const Chat = () => {
  const { messages, loadingMessages } = useMessage();

  const { containerRef, scrollIntoView } = useScroll();

  useLayoutEffect(() => {
    if (!loadingMessages && messages.length) {
      scrollIntoView();
    }
  }, [loadingMessages, messages]);

  return (
    <Wrapper>
      <Alerts />
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

export default Chat;
