import React, { useLayoutEffect } from "react";

import ChatInput from "../Input/Input";
import ChatMessages from "../Messages/Messages";
import SelectProject from "../SelectProject";
import LiveStatus from "./LiveStatus";

import { useMessage, useScroll } from "../../../../hooks";

import Wrapper from "./style";
import { Alerts } from "../../../common";

const Chat = () => {
  const { messages, loadingMessages } = useMessage();

  const { containerRef, scrollBottom } = useScroll();

  useLayoutEffect(() => {
    if (!loadingMessages && messages.length) {
      scrollBottom();
    }
  }, [loadingMessages, messages, scrollBottom]);

  return (
    <Wrapper>
      <div className="chatbot-live-status-wrapper">
        <LiveStatus />
      </div>
      <Alerts />
      <div>
        <SelectProject />
      </div>
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
