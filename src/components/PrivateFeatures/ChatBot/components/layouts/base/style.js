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
  --chatbot-success: #daf8e6;

  --chatbot-border-radius: 12px;

  .inter-font {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "slnt" 0;
  }

  display: flex;
  min-height: 84vh;
  gap: 2em;
  border-radius: 1em;

  .chat-button {
    background: transparent;
    outline: none;
    border: 1px solid transparent;

    & a {
      text-decoration: none;
      color: white;
    }
  }

  .projects-modal-wrapper {
    width: clamp(300px, 30vw, 500px);
    font-weight: 600;
    margin: auto;
  }

  .documents-upload-list-wrapper {
    overflow-y: auto;
    max-height: 30vh;
    padding-right: 1em;
    margin-block: 1em;
  }

  .dropdown-search-field {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    position: sticky;
    top: 0;
    background-color: white;
  }
  .select-field {
    border-radius: 0.25em;
    & .field-wrapper {
      padding: 0 0.5em;
    }
  }
  .field-error-container {
    transition: opacity 0.5s linear;
    color: var(--chatbot-red);
  }
  .chatbot-dropdown-container {
    z-index: 1;
    position: absolute;
    left: 0;
    top: calc(100% + 0.25em);
    width: 100%;
    background-color: white;
    border-radius: 0.25em;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    max-height: 400px;
    min-height: 100px;
    overflow: hidden;
    overflow-y: auto;
    & .search-loading-wrapper {
      top: 50%;
      left: 50%;
      transform: translateY(-50%);
      position: absolute;
      pointer-events: none;
    }
    & > * {
      padding: 0.75em;
      cursor: pointer;
      &:not(.dropdown-search-field):hover,
      &.selected {
        background-color: var(--chatbot-light-grey);
      }
    }
  }

  .tooltip {
    --bg: white;
    --fg: var(--chatbot-text-primary);
    position: absolute;
    top: 50%;
    text-transform: capitalize;
    left: calc(100% + 1em);
    transform: translateY(-50%);
    border-radius: 0.25em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--bg);
    color: var(--fg);
    z-index: 1111;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    width: max-content;
    padding: 0.25em 0.5em;
    &.tooltip-dark {
      --bg: var(--chatbot-text-primary);
      --fg: white;
    }
    &.align-top {
      top: 0%;
      left: 50%;
      transform: translate(-50%, calc(-100% - 1em));
      &::before {
        border-right-color: transparent;
        border-top-color: var(--bg);
        left: 50%;
        top: 100%;
        transform: translate(-50%, 0%);
      }
    }
    &.align-left {
      left: calc(-100% - 1em);

      &::before {
        border-right-color: transparent;
        border-left-color: var(--bg);
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
        border-bottom-color: var(--bg);
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

  .chatbot-bug-report-btn {
    --spacing-offset: 0.5em;
    position: fixed;
    bottom: var(--spacing-offset);
    right: var(--spacing-offset);
    background-color: var(--chatbot-primary);
    border-radius: 0.5em;
    padding: 0.25em;
  }
`;
