import React, { useLayoutEffect, useRef } from "react";
import PropTypes from 'prop-types';

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

  const handleConversationClick = () => {
    if (typeof setConversation === 'function') {
      setConversation({ id, title });
    } else {
      console.error('setConversation is not a function');
    }
  };

  return (
    <>
      <Wrapper active={active}>
        <div
          className="conversation-header"
          ref={containerRef}
          onClick={handleConversationClick}
        >
          <span className="conversation-title">{title}</span>
          {renderActions?.({ ...conversationProps })}
        </div>
      </Wrapper>
    </>
  );
};

Conversation.propTypes = {
  setConversation: PropTypes.func.isRequired,
  renderActions: PropTypes.func,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Conversation;
