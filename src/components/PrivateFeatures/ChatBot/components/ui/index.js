import { useLocation } from "react-router-dom";

import ChatBot from "./chatbot";
import Admin from "./admin";
import ChatPreview from "./chatPreview";

import GlobalContext from "../../components/contexts/Global";
import CacheContext from "../../components/contexts/Cache";
import ConversationContext from "../../components/contexts/Conversation";
import MessageContext from "../../components/contexts/Message";
import { BaseLayout } from "../layouts";

const Chat = () => {
  const location = useLocation();

  const Component = location.search.includes("mode")
    ? ChatPreview
    : location.search.includes("admin")
    ? Admin
    : ChatBot;

  return (
    <GlobalContext>
      <CacheContext>
        <ConversationContext>
          <MessageContext>
            <BaseLayout>
              <Component />
            </BaseLayout>
          </MessageContext>
        </ConversationContext>
      </CacheContext>
    </GlobalContext>
  );
};

export default Chat;
