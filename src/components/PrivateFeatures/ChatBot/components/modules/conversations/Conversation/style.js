import styled from "styled-components";

export default styled(({ active, ...rest }) => <div {...rest} />)`
  padding: 0.5em 1em;
  position: ${(props) => (props.active ? "sticky" : "unset")};
  top: 0;
  margin-bottom: 0.25em;
  border-radius: 0.5em;
  &:has(.conversation-title:hover) {
    background-color: var(--chatbot-primary);
    .conversation-title {
      color: white;
    }
  }
  background-color: ${(props) =>
    props.active ? "var(--chatbot-primary)" : "initial"};
  .conversation-header {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;

    .delete-button,
    .edit-button {
      color: var(--chatbot-grey);
    }
    
    & .conversation-tools {
      position: relative;
      display: flex;
      gap: .5em;
    }
  }
  .conversation-title {
    font-weight: bold;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${(props) =>
      props.active ? "white" : "var(--chatbot-text-primary)"};
  }
  .conversation-body {
    color: var(--chatbot-grey);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
