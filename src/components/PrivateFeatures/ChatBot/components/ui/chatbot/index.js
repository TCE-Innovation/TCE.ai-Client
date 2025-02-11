import React from "react";
import { MainLayout } from "../../layouts";

import { ChatModule, ConversationsModule } from "../../modules";

const Index = () => {
  return (
    <MainLayout>
      <ConversationsModule />
      <ChatModule />
    </MainLayout>
  );
};

export default Index;
