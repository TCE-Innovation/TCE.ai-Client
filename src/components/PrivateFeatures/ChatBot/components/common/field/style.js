import styled from "styled-components";

export default styled(({ error, ...rest }) => <div {...rest} />)`
  .field-wrapper {
    --field-border-color: ${(props) =>
      props.error ? "var(--chatbot-red)" : "var(--chatbot-grey)"};
    --field-focus-border-color: ${(props) =>
      props.error ? "var(--chatbot-red)" : "var(--chatbot-primary)"};
    border: 1px solid var(--field-border-color);
    position: relative;
    background-color: white;
    border-radius: 0.25em;
    padding: 0 0.75em;
    margin: 0.25em 0;
    display: flex;
    align-items: center;
    gap: 0.75em;
    & .right-addon {
      position: absolute;
      right: 0.75em;
      pointer-events: none;
    }
    &:focus-within {
      border-color: var(--field-focus-border-color);
    }

    & input {
      border: none !important;
      outline: none !important;
      flex: 1;
      background-color: transparent;
    }
  }
`;
