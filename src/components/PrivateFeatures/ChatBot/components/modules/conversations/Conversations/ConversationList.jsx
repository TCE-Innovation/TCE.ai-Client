import React from "react";
import { Loader } from "../../../common";
import Conversation from "../Conversation/Conversation";
import { useChat } from "../../../contexts/Conversation";
import Actions from "../Conversation/Actions";
import EmptyConversations from "./Empty";

const ConversationList = () => {
  const {
    conversations,
    currentConversation,
    selectConversation,
    loading,
  } = useChat();

  return (
    <div className="conversation-list" style={{ minHeight: 200 }}>
      {loading.conversations ? (
        <Loader />
      ) : conversations.length ? (
        conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            {...conversation}
            active={conversation.id === currentConversation?.id}
            setConversation={selectConversation}
            renderActions={(props) => <Actions {...props} />}
          />
        ))
      ) : (
        <EmptyConversations />
      )}
    </div>
  );
};

export default ConversationList;
