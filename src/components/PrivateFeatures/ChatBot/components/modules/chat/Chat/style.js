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
`;
