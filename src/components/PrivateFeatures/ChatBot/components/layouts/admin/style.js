import styled from "styled-components";

export default styled.div`
  flex: 1;
  .chatbot-admin-container {
    max-height: 84vh;
    overflow: hidden;
  }
  .admin-header {
    padding: 0 10px;
    z-index: 9999;
  }
  .add-project-button {
    color: var(--chatbot-grey);
    padding: 0.5em;
    border-radius: 0.5em;
    & span {
      color: var(--chatbot-text-primary);
      font-weight: bold;
    }
    &:hover {
      background-color: white;
    }
  }
  .document-metadata {
    border: 1px solid var(--chatbot-grey);
    color: var(--chatbot-text-primary);
    margin: 0.75em 0;
    border-radius: 0.25em;
    background-color: var(--chatbot-light-grey);
    &::after {
      content: attr(data-size);
      font-size: 0.75em;
      margin-left: 0.75em;
      color: var(--chatbot-grey);
    }
  }
  .admin-table-container {
    height: 65vh;
    padding-right: 10px;
    overflow: hidden auto;
  }
  .admin-actions {
    color: var(--chatbot-grey);
    .action-button:hover {
      color: var(--chatbot-text-primary);
    }
  }
  .upload-button {
    color: var(--chatbot-primary);
    background-color: var(--chatbot-light-grey) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    padding: 0.75em 0.25em;
    font-weight: bold;
    font-size: 1.2em;
    border: 1px solid transparent;
    &:hover {
      border-color: var(--chatbot-primary);
    }
  }
  .sort-button {
    padding: 0.25em;
    border-radius: 0.25em;
    &:hover {
      background-color: var(--chatbot-light-grey);
    }
  }
`;
