import styled from "styled-components";

export default styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .document-container {
    // background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 680px;
    gap: 1em;
    position: relative;
    border-radius: var(--chatbot-border-radius);
  }
  .document-header {
    color: white;
    font-size: 0.85em;
    justify-content: space-between;
    background-color: var(--chatbot-primary);
    padding: 0.5em 1em;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    & .document-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 300px;
    }
    & .document-close-btn {
      color: white;
    }
    & .document-page-numeric {
      display: inline-block;
      padding: 0 0.25em;
      margin: 0 0.25em;
      text-align: center;
    }
    & .document-page-info {
      display: flex;
      padding: 0.25em;
      border-radius: 0.25em;
      align-items: center;
      background-color: #16355e;
      & span:nth-child(2) {
        background-color: var(--chatbot-primary);
      }
    }
    & .document-navigation {
      display: flex;
      align-items: center;
      & button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.5em;
        height: 1.5em;
        padding: 0.25em;
        color: white;
        border-radius: 50%;
        &:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }
  .document-body {
    padding: 0.5em;
    overflow: hidden;
    // height: 680px;
    background-color: white;
    border-radius: 0.5em;
    flex: 1;
  }
  .rpv-core__page-layer::after {
    box-shadow: none !important;
  }
  // .rpv-core__text-layer-text {
  //   color: black;
  // }
  // .rpv-core__text-layer {
  //   opacity: 1;
  // }
  // .rpv-core__text-layer-text {
  //   font-family: "Inter", sans-serif !important;
  //   font-weight: 400 !important;
  //   line-height: 20px !important;
  //   font-style: normal !important;
  //   font-variation-settings: "slnt" 0 !important;
  // }
`;
