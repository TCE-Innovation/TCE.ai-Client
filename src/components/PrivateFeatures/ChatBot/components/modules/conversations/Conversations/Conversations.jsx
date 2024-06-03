import React, { useRef } from "react";

import Conversation from "../Conversation/Conversation";
import CreateConversation from "../CreateConversation";

import Wrapper from "./style";

import { EditIcon, LeftIcon, RightIcon } from "../../../icons";

import { useConversation, useStorage } from "../../../../hooks";
import { Loader } from "../../../common";

const Conversations = () => {
  const {
    conversations,
    currentConversation,
    createConversation,
    setCurrentConversation,
    loadingConversations: loading,
    isCreatingConversation,
  } = useConversation();
  const [isCollapsed, setIsCollapsed] = useStorage(
    "CHATBOT-SIDEBAR-STATE",
    false
  );

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const conversationsRef = useRef(null);

  const actions = [
    {
      title: "Create new chat",
      icon: EditIcon,
      handler: createConversation,
    },
  ];

  return (
    <>
      <Wrapper>
        <div
          className={`conversations ${isCollapsed ? "slide-left" : ""}`}
          ref={conversationsRef}
        >
          <CreateConversation />
          <div className="conversation-list">
            {isCreatingConversation && (
              <div
                style={{
                  position: "relative",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                <Loader size={3} />
                <Conversation
                  active={false}
                  setConversation={() => {}}
                  title={<>&zwnj;</>}
                  id={null}
                />
              </div>
            )}
            {loading ? (
              <Loader />
            ) : conversations.length ? (
              conversations.map((conversation) => (
                <Conversation
                  key={conversation.id}
                  {...conversation}
                  active={conversation.id === currentConversation}
                  setConversation={setCurrentConversation}
                />
              ))
            ) : isCreatingConversation ? null : (
              <div className="empty-conversation">no conversations</div>
            )}
          </div>
        </div>
        {isCollapsed ? (
          <>
            {actions.map((action) => {
              return (
                <div
                  key={action.title}
                  className="action-button tooltip-container"
                  onClick={action.handler}
                >
                  <action.icon />
                  <div className="tooltip">{action.title}</div>
                </div>
              );
            })}
          </>
        ) : null}
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
