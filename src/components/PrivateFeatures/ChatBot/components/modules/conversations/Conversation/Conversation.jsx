import React, { useLayoutEffect, useRef } from "react";

import { useScroll } from "../../../../hooks";

import Wrapper from "./style";

const Conversation = ({
  setConversation,
  renderActions,
  ...conversationProps
}) => {
  const { containerRef, scrollIntoView } = useScroll();

  const mountRef = useRef(false);
  const { title, active, id } = conversationProps;

  useLayoutEffect(() => {
    if (mountRef.current) return;
    if (active) {
      scrollIntoView();
    }
    mountRef.current = true;
  }, [scrollIntoView, active]);

  return (
    <>
      <Wrapper active={active}>
        <div
          className="conversation-header"
          ref={containerRef}
          onClick={() => setConversation({ id, title })}
        >
          <span className="conversation-title">{title}</span>
          {renderActions?.({ ...conversationProps })}
        </div>
      </Wrapper>
    </>
  );
};

export default Conversation;
