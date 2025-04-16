import styled from "styled-components";

export default styled.div`
  flex: 1;
  .chatbot-admin-container {
    position: relative;
    max-height: 84vh;
    overflow: hidden;
  }
  .admin-header {
    padding: 0 10px;
    z-index: 1300;
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
  & .admin-table-wrapper {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 8px;
      right: 20px;
      z-index: 1;
      top: 0;
      background: var(--chatbot-light-grey);
    }

    & .admin-table-container {
      height: calc(100vh - 200px);
      padding-right: 10px;
      overflow: hidden auto;
    }
  }

  .admin-actions {
    color: var(--chatbot-grey);
    .action-button:not(.disabled):hover {
      color: var(--chatbot-text-primary);
    }
    .action-button.disabled {
      cursor: initial !important;
    }
  }
  .upload-button {
    color: var(--chatbot-primary);
    background-color: var(--chatbot-light-grey) !important;
    display: flex;
    cursor: pointer;
    // position: relative;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    padding: 0.75em 0.25em;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: var(--chatbot-border-radius);
    border: 1px solid transparent;
    &:hover,
    &:focus-within {
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
  .avatar-group {
    display: flex;
    .hidden-avatars-count .author-avatar {
      background-color: white;
    }
    > * {
      --avatar-size: 24px;
      font-size: calc(var(--avatar-size) * 0.5);
      & .author-avatar {
        position: relative;
        border: 2px solid white;
        box-sizing: border-box;
        background-color: var(--chatbot-grey);
        font-weight: 100;
        transform: scale(1.5);
        height: var(--avatar-size);
        width: var(--avatar-size);

        &::before {
          position: absolute;
          content: attr(data-text);
          z-index: 1;
          font-size: calc(var(--avatar-size) * 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
