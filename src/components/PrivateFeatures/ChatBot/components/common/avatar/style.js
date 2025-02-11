import styled from "styled-components";

export default styled.div`
  .author-avatar {
    font-size: var(--size);
    position: relative;
    height: 1.5em;
    width: 1.5em;
    text-align: center;
    background-color: var(--chatbot-light-grey);
    border-radius: 50%;
    font-weight: bolder;
    &.user-avatar {
      background-color: var(--chatbot-secondary);
    }
    & img {
      object-fit: contain;
      position: relative;
      width: 100%;
      z-index: 1;
    }
    color: black;
    user-select: none;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;

    &::before {
      position: absolute;
      content: attr(data-name);
      z-index: -1;
      top: 0;
      left: 0;
      text-align: center;
      height: 100%;
      width: 100%;
    }
  }
`;
