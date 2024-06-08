import styled, { keyframes } from "styled-components";

const idle = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(0);
  }
`;

export default styled(({ duration, ...rest }) => <div {...rest} />)`
  --chatbot-alert-red: var(--chatbot-red);
  --chatbot-alert-light-red: var(--chatbot-light-red);

  .animation-wrapper {
    animation-name: ${idle};
    animation-duration: ${(props) => props.duration}s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
  }
  .alert-container {
    position: absolute;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
    z-index: 99999999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75em;
  }
`;
