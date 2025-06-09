import styled from "styled-components";

export default styled.div`
  --size: 1.5em;
  display: flex;
  margin-top: 2em;
  gap: 1em;
  align-items: flex-start;
  .message-container {
    flex: 1;
    margin-right: 1.5em;
    .author {
      font-weight: bolder;
      font-size: var(--size);
    }
    .message-body {
      word-break: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      color: var(--chatbot-text-primary);
      line-height: 2em;
    }
  }
  .citations-wrapper {
    border-top: 1px solid var(--chatbot-grey);
    margin-top: 1.5em;
    > * {
      padding: 0.75em 0;
    }
    > :not(:last-child) {
      border-bottom: 1px solid var(--chatbot-light-grey);
    }
  }
  .document-open-btn {
    color: var(--chatbot-primary);
  }
  .author-avatar {
    font-size: var(--size);
    position: relative;
    height: 1.5em;
    width: 1.5em;
    text-align: center;
    border-radius: 50%;
    font-weight: bolder;
    &.user-avatar {
      background-color: var(--chatbot-secondary);
    }
    color: black;
    user-select: none;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;

    &::before {
      position: absolute;
      content: attr(data-name);
      z-index: -1;
      top: 0;
      left: 0;
      text-align: center;
      height: 100%;
      width: 100%;
    }
  }

  .message-feedback-container {
    display: flex;
    align-items: center;
    .feedback-button {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0.5em;
      border-radius: 50%;
      color: var(--chatbot-grey);
      &:hover:not(.settled) {
        color: var(--chatbot-primary);
        background-color: var(--chatbot-grey);
      }
      &.settled {
        color: var(--chatbot-primary);
      }
    }
  }
`;
