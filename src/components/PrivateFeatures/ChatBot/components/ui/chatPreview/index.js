import React from "react";

import LiveStatus from "../../modules/chat/Chat/LiveStatus";
import PreviewChat from "../../modules/chat/Chat/Preview";
import PreviewConversation from "../../modules/conversations/Conversations/ConversationPreview";
import BackButton from "./_BackButton";

import { MainLayout } from "../../layouts";

import AdminGuard from "../../auth/Admin";
import AdminContext from "../../contexts/Admin";

const ChatPreview = () => {
  return (
    <AdminContext>
      <AdminGuard>
        <MainLayout>
          <PreviewConversation />
          <div className="d-flex flex-column gap-2" style={{ height: "100%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <BackButton title={"Back to Users"} />
              <div>
                <LiveStatus />
              </div>
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <PreviewChat />
            </div>
          </div>
        </MainLayout>
      </AdminGuard>
    </AdminContext>
  );
};

export default ChatPreview;
