import React from "react";
import Layout from "../../layouts/main";

import ConversationContext from "../../contexts/Conversation";
import MessageContext from "../../contexts/Message";
import GlobalContext from "../../contexts/Global";

import { ChatModule, ConversationsModule } from "../../modules";

const index = () => {
  return (
    <GlobalContext>
      <ConversationContext>
        <MessageContext>
          <Layout>
            <ConversationsModule />
            <ChatModule />
          </Layout>
        </MessageContext>
      </ConversationContext>
    </GlobalContext>
  );
};

export default index;
