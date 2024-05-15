import React, { useState } from "react";

import styled from "styled-components";

import Conversation from "./Conversation";

import { EditIcon, LeftIcon, RightIcon } from "../../icons";

const dummy = [
  {
    id: 0,
    title: "New Chat",
    body: "e omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iu",
  },
  {
    id: 1,
    title: "New Chat 2",
    body: "Lorem ipsum dolor sit a",
  },
  {
    id: 2,
    title: "New Chat 3",
    body: "Lorem ipsum dolor sit a",
  },
  {
    id: 3,
    title: "New Chat 4",
    body: "Lorem ipsum dolor sit a",
  },
];

const Conversations = () => {
  const [conversations, setConversations] = useState([...dummy]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(dummy[0].id);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const createConversation = () => {
    const id = conversations.length;
    setConversations((prev) => [
      { title: "New Chat", body: "Empty", id },
      ...prev,
    ]);
    setCurrentConversation(id);
  };

  const deleteConversation = (id) => (e) => {
    e.stopPropagation();
    const target = conversations.find((c) => c.id !== id)?.id || null;
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setCurrentConversation(target);
  };

  const actions = [
    {
      title: "Create new chat",
      icon: EditIcon,
      hander: createConversation,
    },
  ];

  return (
    <>
      <Wrapper>
        {isCollapsed ? (
          <>
            {actions.map((action) => {
              return (
                <div
                  key={action.title}
                  className="action-button tooltip-container"
                  onClick={action.hander}
                >
                  <action.icon />
                  <div className="tooltip">{action.title}</div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="conversations">
            <div className="create-new-chat">
              <span>Create new chat</span>
              <span
                className="edit-button tooltip-container"
                onClick={createConversation}
              >
                <EditIcon />
                <div className="tooltip">Create new chat</div>
              </span>
            </div>
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
        )}
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
