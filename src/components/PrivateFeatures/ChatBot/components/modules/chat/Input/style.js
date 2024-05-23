import styled from "styled-components";

export default styled.div`
  --input-container-size: 3em;
  display: flex;
  gap: 0.5em;
  align-items: center;
  .input-container {
    ::placeholder {
      color: var(--chatbot-grey);
    }
    flex: 1;
    border: 1px solid var(--chatbot-grey);
    border-radius: calc(.66 * var(--chatbot-border-radius));
    padding: 0.25em;
    padding-left: 1em;
    &:focus-within {
      border-color: var(--chatbot-primary);
      & + .send-button {
        display: inline-block;
      }
    }
    height: var(--input-container-size);
    line-height: calc(var(--input-container-size) * 0.75);
  }
  .send-button {
    color: white;
    display: none;
    background-color: var(--chatbot-primary);
    align-self: stretch;
    border-radius: calc(.66 * var(--chatbot-border-radius));
    width: var(--input-container-size);
  }
`;
