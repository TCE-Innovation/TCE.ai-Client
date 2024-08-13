import React, { useEffect } from "react";
import Layout from "../../layouts/main";

import ConversationContext from "../../contexts/Conversation";
import MessageContext from "../../contexts/Message";
import GlobalContext from "../../contexts/Global";

import { ChatModule, ConversationsModule } from "../../modules";

const Index = () => {
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

export default Index;
