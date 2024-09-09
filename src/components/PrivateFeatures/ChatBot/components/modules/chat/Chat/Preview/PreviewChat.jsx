import React, { useLayoutEffect } from "react";

import ChatMessages from "./PreviewMessages";
import SelectProject from "../../SelectProject";

import { useMessage, useScroll } from "../../../../../hooks";

import Wrapper from "../style";

const PreviewChat = () => {
  const { messages, loadingMessages } = useMessage();

  const { containerRef, scrollBottom } = useScroll();

  useLayoutEffect(() => {
    if (!loadingMessages && messages.length) {
      scrollBottom();
    }
  }, [loadingMessages, messages, scrollBottom]);

  return (
    <Wrapper>
      <div>
        <SelectProject />
      </div>
      <div ref={containerRef} className="messages-container">
        <ChatMessages />
      </div>
    </Wrapper>
  );
};

export default PreviewChat;
