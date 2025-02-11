import React from "react";
import { Loader } from "../../../common";
import Conversation from "../Conversation/Conversation";
import { useConversation } from "../../../../hooks";
import Actions from "../Conversation/Actions";
import EmptyConversations from "./Empty";

const ConversationList = () => {
  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    loadingConversations: loading,
    isCreatingConversation,
  } = useConversation();
  return (
    <>
      <div className="conversation-list">
        {isCreatingConversation && (
          <div
            style={{
              position: "relative",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <Loader size={3} />
            <Conversation
              active={false}
              setConversation={() => {}}
              title={<>&zwnj;</>}
              id={null}
            />
          </div>
        )}
        {loading ? (
          <Loader />
        ) : conversations.length ? (
          conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              {...conversation}
              active={conversation.id === currentConversation?.id}
              setConversation={setCurrentConversation}
              renderActions={(props) => <Actions {...props} />}
            />
          ))
        ) : isCreatingConversation ? null : (
          <EmptyConversations />
        )}
      </div>
    </>
  );
};

export default ConversationList;
