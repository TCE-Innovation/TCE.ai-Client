import styled from "styled-components";

export default styled.div((props) => {
  return `
      padding: .5em 1em;
      margin-bottom: .25em;
      border-radius: .5em;
      &:has(.conversation-title:hover) {
          background-color: var(--chatbot-primary);
          .conversation-title {
              color: white;
          }
      };
      background-color: ${props.active ? "var(--chatbot-primary)" : "initial"};
      .conversation-header {
          display: flex;
          cursor: pointer;
          justify-content: space-between;
          align-items: center;
  
          .delete-button {
              color: var(--chatbot-grey);
          };
      };
      .conversation-title {
          font-weight: bold;
          flex: 1;
        color: ${props.active ? "white" : "var(--chatbot-text-primary)"};
      };
      .conversation-body {
        color: var(--chatbot-grey);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      };
    `;
});
