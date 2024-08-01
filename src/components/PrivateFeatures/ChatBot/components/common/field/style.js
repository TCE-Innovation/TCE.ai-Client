import styled from "styled-components";

export default styled.div`
  .field-wrapper {
    border: 1px solid var(--chatbot-grey);
    background-color: white;
    border-radius: 0.25em;
    padding: 0 0.75em;
    margin: 0.25em 0;
    display: flex;
    align-items: center;
    gap: 0.75em;
    &:focus-within {
      border-color: var(--chatbot-primary);
    }

    & input {
      border: none !important;
      outline: none !important;
      flex: 1;
      background-color: transparent;
    }
  }
`;
