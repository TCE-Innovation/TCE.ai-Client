import styled from "styled-components";

export default styled.div`
  display: flex;
  border-radius: var(--chatbot-border-radius);
  background-color: var(--chatbot-background);
  flex-direction: column;
  padding: 1.5em;
  height: 100%;
  gap: 1em;
  .welcome-text {
    font-size: 3.5em;
    font-weight: bolder;
    & span:last-child {
      color: var(--chatbot-grey);
    }
  }
  .messages-container {
    overflow: hidden auto;
    flex: 1;
    position: relative;
  }
  .message-input-container {
    margin-top: auto;
    & input {
      background-color: transparent;
      width: 100%;
      border: none;
      outline: none;
    }
  }
  .chatbot-live-status {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--chatbot-secondary);
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
    pointer-events: none;
    font-weight: 600;
    color: var(--chatbot-text-primary);
    background-color: var(--chatbot-secondary);
    &.pursuit {
      color: white;
      background-color: var(--chatbot-primary);
    }
  }
`;
