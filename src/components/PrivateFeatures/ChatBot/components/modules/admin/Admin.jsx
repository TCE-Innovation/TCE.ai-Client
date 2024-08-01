import React from "react";

import { TabContext } from "../../common";

import DocumentsTable from "./Documents";
import ProjectsTable from "./Projects";
import UsersTable from "./Users";

import { FolderIcon, UsersIcon, DocumentIcon } from "../../icons";

import AddNewButton from "./AddNew";

import { useQueryParam } from "../../../hooks";

const tabs = [
  {
    title: "Projects",
    icon: FolderIcon,
    pane: ProjectsTable,
  },
  {
    title: "Users",
    icon: UsersIcon,
    pane: UsersTable,
  },
  {
    title: "Documents",
    icon: DocumentIcon,
    pane: DocumentsTable,
  },
];

const Admin = () => {
  const { push, getQuery } = useQueryParam();
  const tab = getQuery("profile");
  const defaultTab = Math.max(
    0,
    tabs.findIndex((t) => t.title.toLowerCase() === tab.toLowerCase())
  );

  return (
    <TabContext defaultActive={defaultTab} tabs={tabs.map((tab) => tab.title)}>
      <div className="h-100 chatbot-admin-container d-flex flex-column">
        <div className="admin-header position-sticky top-0 d-flex justify-content-between align-items-center">
          <div className="tabs-wrapper">
            <TabContext.Tabs
              renderTab={({ tab, tabIndex, activeTab }) => {
                const TabIcon = tabs[tabIndex].icon;
                return (
                  <div
                    onClick={() =>
                      push({ profile: tabs[tabIndex].title.toLowerCase() })
                    }
                    className={`d-flex align-items-center gap-1 px-4`}
                  >
                    <span>
                      <TabIcon />
                    </span>
                    <span>{tab}</span>
                  </div>
                );
              }}
            />
          </div>
          <AddNewButton profile={tab.toLowerCase()} />
        </div>
        <div className="flex-grow-1" style={{ overflow: "auto hidden" }}>
          <TabContext.Panes>
            {tabs.map((tab, i) => {
              const Component = tab.pane;
              return <Component key={i} />;
            })}
          </TabContext.Panes>
        </div>
      </div>
    </TabContext>
  );
};

export default Admin;
