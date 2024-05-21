import React from "react";

import { DeleteIcon } from "../../../icons";

import Wrapper from "./style";

const Conversation = ({
  title,
  body,
  id,
  active,
  setConversation,
  deleteConversation,
}) => {
  return (
    <Wrapper active={active}>
      <div className="conversation-header" onClick={() => setConversation(id)}>
        <span className="conversation-title">{title}</span>
        <div>
          {active ? (
            <span className="delete-button" onClick={deleteConversation}>
              <DeleteIcon color="inherit" />
            </span>
          ) : null}
        </div>
      </div>
      <div className="conversation-body">{body}</div>
    </Wrapper>
  );
};

export default Conversation;
