import styled from "styled-components";

export default styled.div`
  .chatbot-badge {
    --purple: #c814f6;
    --purple-light: #fcf1fe;
    --blue: #1c3fb7;
    --blue-light: #e1e8ff;
    --green: #1a8245;
    --green-light: #daf8e6;
    border-radius: 0.25em;
    width: max-content;
    padding: 0.25em 0.5em;
    font-weight: bold;

    &.purple {
      color: var(--purple);
      background-color: var(--purple-light);
    }
    &.blue {
      color: var(--blue);
      background-color: var(--blue-light);
    }
    &.green {
      color: var(--green);
      background-color: var(--green-light);
    }
    &.yellow {
      color: var(--chatbot-text-primary);
      background-color: #f8f1d7;
    }
  }
`;
