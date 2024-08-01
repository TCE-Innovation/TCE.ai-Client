import styled from "styled-components";

export default styled.div`
  height: 100%;
  .conversations {
    height: 100%;
    width: 20vw;
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
    align-items: center;
  }
  .chatbot-admin-button {
    color: var(--chatbot-grey);
  }
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  .create-new-chat {
    background-color: white;
    display: flex;
    font-size: 1.1em;
    padding: 0.75em 1.25em;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--chatbot-border-radius);
    .edit-button {
      color: var(--chatbot-grey);
    }
  }
  .chatbot-admin-button {
    cursor: pointer;
  }
  .conversation-list {
    position: relative;
    border-radius: var(--chatbot-border-radius);
    background-color: white;
    padding: 0.5em;
    overflow: hidden auto;
    flex: 1;
    .conversation.active {
      color: white;
      background-color: var(--chatbot-primary);
    }
  }
`;
