import React from "react";
import { EditIcon } from "../../icons";
import { useChat } from "../../contexts/Conversation";

const CreateConversation = () => {
  const { startNewChat, loading } = useChat();

  return (
    <div className="create-new-chat">
      <span>Create new chat</span>
      <button
        disabled={loading.conversations}
        className="chat-button edit-button tooltip-container"
        onClick={startNewChat}
      >
        <EditIcon />
        <div className="tooltip">Create new chat</div>
      </button>
    </div>
  );
};

export default CreateConversation;
