import styled from "styled-components";

export default styled.div`
  .chatbot-mode-switcher {
    width: max-content;
    background-color: white;
    border-radius: 0.25em;
    padding: 0.25em;
    & button {
      border-radius: 0.25em;
      padding: 0.25em 0.75em;
    }
  }
  height: 100%;
  .avatar-group {
    display: flex;
    > *:last-child {
      & .author-avatar {
        background: white;
      }
    }
    > * {
      --avatar-size: 24px;
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
