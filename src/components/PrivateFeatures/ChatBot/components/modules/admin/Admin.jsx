import React from "react";

import { TabContext, Alerts } from "../../common";

import ProjectsTable from "./Projects";
import UsersTable from "./Users";
import TeamsTable from "./Teams";

import { FolderIcon, UsersIcon, UserIcon } from "../../icons";

import AddNewButton from "./AddNew";

import { useGlobal } from "../../../hooks";

const tabs = [
  {
    title: "Projects",
    icon: FolderIcon,
    pane: ProjectsTable,
  },
  {
    title: "Users",
    icon: UserIcon,
    pane: UsersTable,
  },
  {
    title: "Teams",
    icon: UsersIcon,
    pane: TeamsTable,
  },
];

const Admin = () => {
  const { query } = useGlobal();
  const { push, getQuery } = query;
  const tab = getQuery("profile");
  const defaultTab = Math.max(
    0,
    tabs.findIndex((t) => t.title.toLowerCase() === tab.toLowerCase())
  );

  return (
    <TabContext defaultActive={defaultTab} tabs={tabs}>
      <div className="h-100 chatbot-admin-container d-flex flex-column">
        <Alerts />
        <div className="admin-header position-sticky top-0 d-flex justify-content-between align-items-center">
          <div className="tabs-wrapper">
            <TabContext.Tabs
              renderTab={({ tab, tabIndex }) => {
                const TabIcon = tabs[tabIndex].icon;
                return (
                  <div
                    onClick={() => {
                      push({ profile: tabs[tabIndex].title.toLowerCase() });
                    }}
                    className={`d-flex align-items-center gap-1 px-4 py-2`}
                  >
                    <span>
                      <TabIcon />
                    </span>
                    <span>{tab.title}</span>
                  </div>
                );
              }}
            />
          </div>
          <AddNewButton />
        </div>
        <div className="flex-grow-1 d-flex" style={{ overflow: "auto hidden" }}>
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
