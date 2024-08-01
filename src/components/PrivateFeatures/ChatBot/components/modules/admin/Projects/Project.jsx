import React from "react";

import AddNew from "../AddNew";
import SearchComponent from "../Search";
import DocumentsTable from "../Documents/Table";
import UsersTable from "../Users/Table";

import { TabContext } from "../../../common";

const ProjectUsers = () => {
  return (
    <>
      <UsersTable rows={[]} />
    </>
  );
};

const ProjectDocuments = () => {
  return (
    <>
      <DocumentsTable rows={[]} />
    </>
  );
};

const PROJECT_NAV_TABS = [
  {
    title: "Project Users",
    pane: ProjectUsers,
  },
  {
    title: "Project Documents",
    pane: ProjectDocuments,
  },
];

const Project = () => {
  return (
    <div>
      <TabContext tabs={PROJECT_NAV_TABS.map((p) => p.title)}>
        <div className="d-flex align-items-center gap-4 my-3">
          <div className="flex-grow-1">
            <TabContext.Tabs
              renderTab={({ tab }) => {
                return (
                  <div className="d-flex align-items-center">
                    <span>{tab}</span>
                  </div>
                );
              }}
            />
          </div>
          <TabContext.Provider>
            {({ activeTab }) => {
              return (
                <div>
                  {activeTab === 0 ? (
                    <SearchComponent
                      placeholder={"Search a user"}
                      onChange={console.log}
                    />
                  ) : activeTab === 1 ? (
                    <SearchComponent
                      placeholder={"Search a document"}
                      onChange={console.log}
                    />
                  ) : null}
                </div>
              );
            }}
          </TabContext.Provider>
          <TabContext.Provider>
            {({ activeTab }) => {
              return (
                <div>
                  {activeTab === 0 ? (
                    <AddNew.UserToProject />
                  ) : activeTab === 1 ? (
                    <AddNew.DocumentToProject />
                  ) : null}
                </div>
              );
            }}
          </TabContext.Provider>
        </div>
        <div>
          <TabContext.Panes>
            {PROJECT_NAV_TABS.map((tab, i) => {
              const Component = tab.pane;
              return <Component key={i} />;
            })}
          </TabContext.Panes>
        </div>
      </TabContext>
    </div>
  );
};

export default Project;
