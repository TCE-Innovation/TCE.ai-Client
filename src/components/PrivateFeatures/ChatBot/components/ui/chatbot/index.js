import React from "react";
import Layout from "../../layouts/main";

import ConversationContext from "../../contexts/Conversation";
import MessageContext from "../../contexts/Message";
import AlertContext from "../../contexts/Alert";

import { ChatModule, ConversationsModule } from "../../modules";

const index = () => {
  return (
    <AlertContext>
      <ConversationContext>
        <MessageContext>
          <Layout>
            <ConversationsModule />
            <ChatModule />
          </Layout>
        </MessageContext>
      </ConversationContext>
    </AlertContext>
  );
};

export default index;
