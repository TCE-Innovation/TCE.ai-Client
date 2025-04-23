import styled from "styled-components";

export default styled.div`
  height: 100%;
  min-width: 320px;
  max-width: 320px;
  width: 320px;
  .conversations {
    height: 100%;
    display: flex;
    font-weight: bold;
    flex-direction: column;
    gap: 0.5em;
    transition: transform 0.2s ease-in;
    min-width: 320px;
    max-width: 320px;
    width: 320px;
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
    border-radius: var(--chatbot-border-radius);
    width: 320px;
    min-width: 320px;
    max-width: 320px;
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
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    .edit-button {
      color: var(--chatbot-grey);
    }
  }
  .chatbot-admin-button {
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: var(--chatbot-light-grey);
    }
  }
  .conversation-list {
    position: relative;
    border-radius: var(--chatbot-border-radius);
    background-color: white;
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    min-height: 200px;
    padding: 0.5em;
    overflow: hidden auto;
    flex: 1;
    .conversation.active {
      color: white;
      background-color: var(--chatbot-primary);
    }
  }
`;
