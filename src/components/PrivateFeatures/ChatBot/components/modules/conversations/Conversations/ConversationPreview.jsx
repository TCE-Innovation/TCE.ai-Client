import React from "react";
import Conversation from "../Conversation/Conversation";
import EmptyConversations from "./Empty";
import { useConversation } from "../../../../hooks";

import Wrapper from "./style";

const ConversationList = () => {
  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    isCreatingConversation,
  } = useConversation();

  return (
    <Wrapper>
      <div className="conversation-list">
        {conversations.length ? (
          conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              {...conversation}
              active={conversation.id === currentConversation?.id}
              setConversation={setCurrentConversation}
            />
          ))
        ) : isCreatingConversation ? null : (
          <EmptyConversations />
        )}
      </div>
    </Wrapper>
  );
};

export default ConversationList;
