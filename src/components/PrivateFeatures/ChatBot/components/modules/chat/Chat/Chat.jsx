import React from "react";
import Messages from "../Messages/Messages";
import SelectProject from "../SelectProject";
import ChatInput from "../Input/Input";
import Wrapper from "./style";
import { useChat } from "../../../contexts/Conversation";

const Chat = () => {
  const { currentProject, loading } = useChat();
  const isInputVisible = currentProject && !loading.projects;

  return (
    <Wrapper>
      <div>
        <SelectProject />
      </div>
      <div className="messages-container">
        <Messages />
      </div>
      {isInputVisible && (
        <div className="message-input-container">
          <ChatInput />
        </div>
      )}
    </Wrapper>
  );
};

export default Chat;
