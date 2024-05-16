import React, { Children } from "react";

import styled from "styled-components";

const MainLayout = ({ children }) => {
  const [Conversations, Chat] = Children.toArray(children);
  return (
    <Wrapper>
      <div className="conversation-wrapper">{Conversations}</div>
      <div className="chat-wrapper">{Chat}</div>
    </Wrapper>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  --chatbot-primary: #1c469d;
  --chatbot-secondary: #ffcf00;
  --chatbot-text-secondary: #6f7e95;
  --chatbot-text-primary: #2b2b2b;
  --chatbot-grey: #bfc6d0;
  --chatbot-background: #ffffffcc;

  display: flex;
  height: 84vh;
  gap: 1em;
  border-radius: 1em;
  .conversation-wrapper {
    position: relative;
    border-radius: 1em;

    .collapse-handle {
      position: absolute;
      left: calc(100% + 5px);
      color: var(--chatbot-grey);
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .chat-wrapper {
    flex: 1;
    border: 1px solid var(--chatbot-grey);
    border-radius: 1em;
    overflow: hidden;
    max-width: 850px;
    margin: 0 auto;
    transition: all 0.5s linear;
  }
  .tooltip {
    position: absolute;
    top: 50%;
    left: calc(100% + 1em);
    transform: translateY(-50%);
    border-radius: 0.25em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: var(--chatbot-text-primary);
    z-index: 10;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    width: max-content;
    padding: 0.25em 0.5em;
  }
  .tooltip-container {
    position: relative;
    cursor: pointer;
  }
  .tooltip::before {
    position: absolute;
    z-index: 10;
    pointer-events: none;
    user-select: none;
    content: " ";
    border: 5px solid transparent;
    left: 0;
    opacity: inherit;
    top: 50%;
    transform: translate(-100%, -50%);
    border-right-color: white;
  }
  .tooltip-container:hover .tooltip {
    opacity: 1;
  }
`;
