import styled from "styled-components";

export default styled.div`
  .chatbot-modal-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2em;
    background-color: white;
    border-radius: 0.75em;
    padding: 2em;
    padding-bottom: 1em;

    & .chatbot-modal-header {
      font-weight: bolder;
      font-size: 1.5em;
    }

    & .chatbot-modal-body {
      color: var(--chatbot-grey);
    }

    & .chatbot-modal-footer {
      margin-top: auto;

      & .chatbot-modal-buttons {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        & button {
          font-weight: 600;
        }

        & .modal-submit-btn {
          position: relative;
          background-color: var(--chatbot-primary);
          color: white;
        }
        & .modal-cancel-btn {
          background-color: var(--chatbot-primary);
          color: white;
        }
      }
    }
  }
`;
