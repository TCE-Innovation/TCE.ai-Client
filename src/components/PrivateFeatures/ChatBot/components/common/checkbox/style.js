import styled from "styled-components";

export default styled(({ size, ...rest }) => <div {...rest} />)`
  display: inline-block;
  .checkbox-wrapper {
    --checkbox-size: calc(${(props) => props.size} * 1em);
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    border-radius: 0.5em;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px solid var(--chatbot-light-grey);
    background-color: white;
    span.checkIcon {
      display: none;

      & svg {
        width: calc(var(--checkbox-size) * 0.75) !important;
        height: calc(var(--checkbox-size) * 0.75) !important;
      }
    }
    &:has(input:checked) {
      background-color: var(--chatbot-primary);

      span.checkIcon {
        display: inline-block;
      }
    }
    &:hover {
      opacity: 0.75;
    }
  }
`;
