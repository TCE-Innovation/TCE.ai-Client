import styled from "styled-components";

export default styled(({ scaler, ...rest }) => <div {...rest} />)`
  position: absolute;
  --document-scaler: 2;
  --resizer: 0.9;
  --document-width: calc(800px * var(--resizer));
  inset: 0;
  width: max-content;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .document-container {
    display: flex;
    flex-direction: column;
    width: calc(var(--document-width) * var(--document-scaler));
    height: calc(
      calc(calc(0.95 * 100vmin) * var(--resizer)) * var(--document-scaler)
    );
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
    width: var(--document-width);
    margin: auto;
    margin-bottom: 0.75em;
    position: sticky;
    top: 28px;
    z-index: 99999;
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
      min-height: 2.5em;
      min-width: 2.5em;
      margin: 0 0.25em;
      text-align: center;
      place-content: center;
    }
    & .document-zoom-controls {
      display: flex;
      align-items: center;
      gap: 0.5em;
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
      gap: 2em;
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
    background-color: white;
    border-radius: 0.5em;
    flex: 1;
    transition: transform 0.2s linear;
    transform: scale(calc(1 / ${(props) => (props.scaler ? props.scaler : 1)}));
    aspect-ratio: 1/1.4;
  }
  .rpv-core__page-layer::after {
    box-shadow: none !important;
  }
`;
