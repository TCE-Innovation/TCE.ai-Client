import styled from "styled-components";

export default styled.div`
  .chatbot-alert {
    display: flex;
    align-items: center;
    gap: 1em;
    opacity: 0;
    min-width: 300px;
    font-weight: 500;
    border-radius: 0.25em;
    padding: 0.5em 0.75em;
    transform: translateY(-1em);
    transition: opacity 0.2s linear, transform 0.2s linear;
    box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    background-color: var(--chatbot-primary);
    color: white;
    &.alert-danger {
      background-color: var(--chatbot-alert-light-red);
      color: var(--chatbot-alert-red);
    }
    &.alert-success {
      background-color: var(--chatbot-success);
      color: var(--chatbot-text-primary);
    }
    &.show {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;
