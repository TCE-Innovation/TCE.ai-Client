import styled from "styled-components";

export default styled.div`
  --chatbot-primary: #1c469d;
  --chatbot-secondary: #ffcf00;
  --chatbot-text-secondary: #6f7e95;
  --chatbot-text-primary: #2b2b2b;
  --chatbot-grey: #bfc6d0;
  --chatbot-light-grey: #eff1f3;
  --chatbot-background: #ffffffcc;
  --chatbot-red: #bc1c21;
  --chatbot-light-red: #fef3f3;

  --chatbot-border-radius: 12px;

  .inter-font {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "slnt" 0;
  }

  display: flex;
  height: 84vh;
  gap: 2em;
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
  .chat-wrapper {
    flex: 1;
    position: relative;
    &.collapsed {
      padding-inline: 5em;
    }
  }
  .tooltip {
    position: absolute;
    top: 50%;
    text-transform: capitalize;
    left: calc(100% + 1em);
    transform: translateY(-50%);
    border-radius: 0.25em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: var(--chatbot-text-primary);
    z-index: 10;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    width: max-content;
    padding: 0.25em 0.5em;
    &.align-top {
      top: 0%;
      left: 50%;
      transform: translate(-50%, calc(-100% - 1em));
      &::before {
        border-right-color: transparent;
        border-top-color: white;
        left: 50%;
        top: 100%;
        transform: translate(-50%, 0%);
      }
    }
    &.align-left {
      left: calc(-100% - 1em);

      &::before {
        border-right-color: transparent;
        border-left-color: white;
        transform: translate(0%, -50%);
        left: 100%;
      }
    }
    &.align-bottom {
      top: calc(100% + 1em);
      left: 50%;
      transform: translate(-50%, 0%);

      &::before {
        border-right-color: transparent;
        border-bottom-color: white;
        transform: translate(-50%, -100%);
        top: 0%;
        left: 50%;
      }
    }
  }
  .tooltip-container {
    position: relative;
    cursor: pointer;
  }
  .tooltip::before {
    position: absolute;
    z-index: 10;
    pointer-events: none;
    user-select: none;
    content: "";
    border: 5px solid transparent;
    left: 0;
    opacity: inherit;
    top: 50%;
    transform: translate(-100%, -50%);
    border-right-color: white;
  }
  .tooltip-container:hover .tooltip {
    opacity: 1;
  }
  .chat-button {
    background: none;
    outline: none;
    border: none;
  }
  *::-webkit-scrollbar {
    width: 0.75em;
    height: 0.75em;
  }
  *::-webkit-scrollbar-track {
    background-color: var(--chatbot-light-grey);
    border-radius: var(--chatbot-border-radius);
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--chatbot-grey);
    border-radius: var(--chatbot-border-radius);
  }

  *::-webkit-scrollbar-button {
    display: none;
  }
`;
