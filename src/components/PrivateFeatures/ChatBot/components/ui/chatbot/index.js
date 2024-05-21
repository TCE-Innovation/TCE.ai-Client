import React from "react";
import Layout from "../../layouts/main";

import ConversationContext from "../../contexts/Conversation";
import MessageContext from "../../contexts/Message";

import { ChatModule, ConversationsModule } from "../../modules";

const index = () => {
  return (
    <ConversationContext>
      <Layout>
        <ConversationsModule />
        <MessageContext>
          <ChatModule />
        </MessageContext>
      </Layout>
    </ConversationContext>
  );
};

export default index;
