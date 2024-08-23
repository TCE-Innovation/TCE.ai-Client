import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChatBot from "./chatbot";
import Admin from "./admin";

// import Cac from "../../hooks/useCacheClient";

import GlobalContext from "../../components/contexts/Global";
import CacheContext from "../../components/contexts/Cache";
import { BaseLayout } from "../layouts";

const Chat = () => {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://adamantcodee.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-vg1gsr/b/8/c95134bc67d3a521bb3f4331beb9b804/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-GB&collectorId=7f4f7542";
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const Component = location.search.includes("admin") ? Admin : ChatBot;

  return (
    <GlobalContext>
      <CacheContext>
        <BaseLayout>
          <Component />
        </BaseLayout>
      </CacheContext>
    </GlobalContext>
  );
};

export default Chat;
