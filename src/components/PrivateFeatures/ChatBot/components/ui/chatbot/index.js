import React from "react";
import { MainLayout } from "../../layouts";

import ConversationContext from "../../../components/contexts/Conversation";
import MessageContext from "../../../components/contexts/Message";

import { ChatModule, ConversationsModule } from "../../modules";

const Index = () => {
  return (
    <ConversationContext>
      <MessageContext>
        <MainLayout>
          <ConversationsModule />
          <ChatModule />
        </MainLayout>
      </MessageContext>
    </ConversationContext>
  );
};

export default Index;
