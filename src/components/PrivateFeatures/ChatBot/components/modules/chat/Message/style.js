import styled from "styled-components";

export default styled.div`
  --size: 1.5em;
  display: flex;
  margin-top: 2em;
  gap: 1em;
  align-items: flex-start;
  .message-container {
    flex: 1;
    .author {
      font-weight: bolder;
      font-size: var(--size);
    }
    .message-body {
      color: var(--chatbot-text-primary);
      line-height: 2em;
    }
  }
  .author-avatar {
    font-size: var(--size);
    position: relative;
    height: 1.5em;
    width: 1.5em;
    border-radius: 50%;
    font-weight: bolder;
    background-color: var(--chatbot-secondary);
    color: black;
    user-select: none;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

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
      &:hover {
        color: var(--chatbot-primary);
        background-color: var(--chatbot-grey);
      }
    }
  }
`;
