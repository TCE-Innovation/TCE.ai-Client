import styled from "styled-components";

export default styled.div`
  height: 100%;
  .chatbot-tabs {
    display: flex;
  }
  .chatbot-tab {
    border-bottom: 2px solid var(--chatbot-grey);
    cursor: pointer;
    padding: 0.25em 0.75em;
    color: var(--chatbot-grey);
    &.chatbot-active-tab,
    &:hover {
      color: var(--chatbot-primary);
    }
    &.chatbot-active-tab {
      border-bottom-color: var(--chatbot-primary);
    }
  }
  .chatbot-tab-pane {
    padding: 0.75em 0;
  }
`;
