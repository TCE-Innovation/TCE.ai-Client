import React from "react";
import Layout from "../../layouts/main";

import { ChatModule, ConversationsModule } from "../../modules";

const index = () => {
  return (
    <Layout>
      <ConversationsModule />
      <ChatModule />
    </Layout>
  );
};

export default index;
