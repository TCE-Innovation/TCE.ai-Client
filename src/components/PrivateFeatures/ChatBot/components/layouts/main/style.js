import styled from "styled-components";

export default styled.div`
  display: flex;
  height: 84vh;
  gap: 2em;
  flex: 1;
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
      z-index: 1000;
    }
  }
  .chatbot-input-container {
    &::placeholder {
      color: var(--chatbot-grey);
    }
    &:focus-within {
      border-color: var(--chatbot-primary);
    }
    flex: 1;
    border: 1px solid var(--chatbot-grey);
    border-radius: calc(0.66 * var(--chatbot-border-radius));
    padding: 0.25em;
    padding-left: 1em;
    height: var(--input-container-size);
    line-height: calc(var(--input-container-size) * 0.75);

    & input {
      border: none;
      outline: none;
    }
  }
  .chat-wrapper {
    flex: 1;
    position: relative;
    &.collapsed {
      padding-inline: 5em;
    }
    & .dropdown-search-field {
      color: var(--chatbot-grey);
      & .field-wrapper {
        background-color: white;
      }
    }
    & .field-wrapper {
      padding: 0.75em !important;
      background-color: var(--chatbot-light-grey);
      border-radius: 0.75em;
    }
    .chatbot-live-status-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      pointer-events: none;
    }
    .chatbot-live-status {
      background-color: var(--chatbot-secondary);
      border-radius: 0.25em;
      padding: 0.25em 0.5em;
      font-weight: 600;
      width: max-content;
      color: var(--chatbot-text-primary);
      background-color: var(--chatbot-secondary);
      &.pursuit {
        color: white;
        background-color: var(--chatbot-primary);
      }
    }
  }
`;
