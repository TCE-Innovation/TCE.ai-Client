import React, { useRef, useState } from "react";

import styled from "styled-components";

import Conversation from "./Conversation";
import CreateConversation from "./CreateConversation";

import { EditIcon, LeftIcon, RightIcon } from "../../icons";

import { useConversation, useStorage } from "../../../hooks";

import { Loader } from "../../common";

const Conversations = () => {
  const {
    conversations,
    currentConversation,
    createConversation,
    deleteConversation,
    setCurrentConversation,
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
            {conversations.length ? (
              conversations.map((conversation) => (
                <Conversation
                  key={conversation.id}
                  {...conversation}
                  active={conversation.id === currentConversation}
                  setConversation={setCurrentConversation}
                  deleteConversation={deleteConversation(conversation.id)}
                />
              ))
            ) : (
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

const Wrapper = styled.div`
  height: 100%;
  .conversations {
    height: 100%;
    width: 30vw;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    transition: transform 0.2s ease-in;
    &.slide-left {
      z-index: 1;
      position: absolute;
      transform: translateX(calc(-100% - 2em));
    }
  }
  .empty-conversation {
    text-align: center;
    color: var(--chatbot-grey);
  }
  .action-button {
    position: relative;
    background-color: white;
    padding: 0.75em;
    color: var(--chatbot-grey);
    border-radius: 0.25em;
    display: flex;
    justify-content: center;
    border: 1px solid var(--chatbot-grey);
    align-items: center;
  }
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  .create-new-chat {
    background-color: white;
    display: flex;
    font-size: 1.1em;
    padding: 0.5em 1.25em;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    border-radius: 1em;
    border: 1px solid var(--chatbot-grey);
    .edit-button {
      color: var(--chatbot-grey);
    }
  }
  .conversation-list {
    position: relative;
    border-radius: 1em;
    background-color: white;
    padding: 0.5em;
    overflow: hidden auto;
    flex: 1;
    border: 1px solid var(--chatbot-grey);
    .conversation.active {
      color: white;
      background-color: var(--chatbot-primary);
    }
  }
`;

export default Conversations;
