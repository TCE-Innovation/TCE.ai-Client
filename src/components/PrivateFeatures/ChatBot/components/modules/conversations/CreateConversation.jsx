import React from "react";

import { EditIcon } from "../../icons";
import { useConversation } from "../../../hooks";

const CreateConversation = () => {
  const { createConversation } = useConversation();
  return (
    <div className="create-new-chat">
      <span>Create new chat</span>
      <span
        className="edit-button tooltip-container"
        onClick={createConversation}
      >
        <EditIcon />
        <div className="tooltip">Create new chat</div>
      </span>
    </div>
  );
};

export default CreateConversation;
