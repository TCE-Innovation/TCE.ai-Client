import React, { useEffect } from "react";

import { EditIcon } from "../../icons";
import { useConversation } from "../../../hooks";

const CreateConversation = () => {
  const {
    createConversation,
    isCreatingConversation,
    currentConversation,
  } = useConversation();

  useEffect(() => {
    if (!currentConversation) {
      createConversation();
    }
  }, []);

  return (
    <div className="create-new-chat">
      <span>Create new chat</span>
      <button
        disabled={isCreatingConversation}
        className="chat-button edit-button tooltip-container"
        onClick={createConversation}
      >
        <EditIcon />
        <div className="tooltip">Create new chat</div>
      </button>
    </div>
  );
};

export default CreateConversation;
