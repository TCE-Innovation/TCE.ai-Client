import React from "react";
import CreateConversation from "../CreateConversation";
import AdminButton from "../AdminButton";
import Wrapper from "./style";
import ConversationList from "./ConversationList";
import FloatingActions from "../FloatingActions";

const Conversations = () => {
  return (
    <>
      <Wrapper>
        <div className="conversations">
          <CreateConversation />
          <ConversationList />
          <AdminButton />
        </div>
      </Wrapper>
    </>
  );
};

export default Conversations;
