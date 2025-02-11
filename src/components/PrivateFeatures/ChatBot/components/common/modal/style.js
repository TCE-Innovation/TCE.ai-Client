import styled from "styled-components";

export default styled.div`
  .chatbot-modal-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2em;
    background-color: white;
    border-radius: 0.75em;
    padding: 2em;
    color: var(--chatbot-text-primary);

    & .chatbot-modal-header {
      font-weight: bolder;
      font-size: 1.5em;
    }

    & .chatbot-modal-body {
      color: var(--chatbot-grey);
      & input {
      outline: none;
      border-radius: .25em;
      padding: .5em;
       &:focus {
       border-color:var(--chatbot-primary);
       }
      }
    }

    & .chatbot-modal-footer {
      margin-top: auto;

      & .chatbot-modal-buttons {
        display: flex;
        gap: 1em;
        justify-content: space-evenly;
        align-items: center;
        & button {
          font-weight: 600;
          flex: 1;
          padding: .75em .75em;
          border-radius: .5em;
          &:hover, &:disabled {
            background-color: var(--chatbot-light-grey) !important;
            color: var(--chatbot-grey) !important;
          }
        }

        & .modal-submit-btn {
          position: relative;
          background-color: var(--chatbot-primary);
          color: white;
          display: flex;
          align-items-center
        }
        & .modal-cancel-btn {
          background-color: var(--chatbot-primary);
          color: white;
        }
      }
    }
  }
`;
