import styled from "styled-components";

export default styled.div`
  outline: none;
  border-radius: calc(0.66 * var(--chatbot-border-radius));
  &:has(.chatbot-input-container input:disabled) {
    background-color: var(--chatbot-light-grey);
  }
  &:focus-within {
    & .send-button:not(:disabled) {
      display: inline-block;
    }
  }

  --input-container-size: 3em;
  display: flex;
  gap: 0.5em;
  align-items: center;
  .send-button {
    color: white;
    display: none;
    background-color: var(--chatbot-primary);
    align-self: stretch;
    border-radius: calc(0.66 * var(--chatbot-border-radius));
    width: var(--input-container-size);
    &:disabled {
      opacity: 0.5;
    }
    &:disabled .tooltip {
      display: none;
    }
  }
`;
