import React, { useRef } from "react";

import CreateConversation from "../CreateConversation";
import AdminButton from "../AdminButton";

import Wrapper from "./style";

import { LeftIcon, RightIcon } from "../../../icons";

import { useGlobal } from "../../../../hooks";

import ConversationList from "./ConversationList";
import FloatingActions from "../FloatingActions";

const Conversations = () => {
  const {
    conversationsCollapsed: isCollapsed,
    setIsConversationsCollapsed: setIsCollapsed,
  } = useGlobal();

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const conversationsRef = useRef(null);

  return (
    <>
      <Wrapper>
        <div
          className={`conversations ${isCollapsed ? "slide-left" : ""}`}
          ref={conversationsRef}
        >
          <CreateConversation />
          <ConversationList />
          <AdminButton />
        </div>
        {isCollapsed ? <FloatingActions /> : null}
      </Wrapper>
      <div
        className="collapse-handle tooltip-container"
        onClick={toggleCollapse}
      >
        {!isCollapsed ? <LeftIcon /> : <RightIcon />}
        <div className="tooltip">
          {isCollapsed ? "Open" : "Hide"}
          <span> conversation history</span>
        </div>
      </div>
    </>
  );
};

export default Conversations;
