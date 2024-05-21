import React from "react";
import Layout from "../../layouts/main";

import ConversationContext from "../../contexts/Conversation";

import { ChatModule, ConversationsModule } from "../../modules";

const index = () => {
  return (
    <ConversationContext>
      <Layout>
        <ConversationsModule />
        <ChatModule />
      </Layout>
    </ConversationContext>
  );
};

export default index;
