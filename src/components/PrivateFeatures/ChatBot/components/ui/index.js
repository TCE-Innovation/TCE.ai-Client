import { useLocation } from "react-router-dom";

import ChatBot from "./chatbot";
import Admin from "./admin";

import ReportButton from "./_Report";

import GlobalContext from "../../components/contexts/Global";
import CacheContext from "../../components/contexts/Cache";
import { BaseLayout } from "../layouts";

const Chat = () => {
  const location = useLocation();

  const Component = location.search.includes("admin") ? Admin : ChatBot;

  return (
    <GlobalContext>
      <CacheContext>
        <BaseLayout>
          <Component />
          <ReportButton />
        </BaseLayout>
      </CacheContext>
    </GlobalContext>
  );
};

export default Chat;
