import styled from "styled-components";

export default styled.div`
  height: 100%;
  .avatar-group {
    display: flex;
    > * {
      --avatar-size: 24px;
      & .author-avatar {
        position: relative;
        border: 1px solid white;
        box-sizing: border-box;
        background-color: var(--chatbot-grey);
        font-weight: 100;
        transform: scale(1.5);
        height: var(--avatar-size);
        width: var(--avatar-size);

        &::before {
          position: absolute;
          content: attr(data-text);
          z-index: 1;
          font-size: calc(var(--avatar-size) * 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
