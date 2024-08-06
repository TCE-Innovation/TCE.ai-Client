import React from "react";

import AddNew from "../AddNew";
import SearchComponent from "../Search";
import DocumentsTable from "../Documents/Table";
import UsersTable from "../Users/Table";

import { TabContext } from "../../../common";

import { genDocuments, genUser } from "../../../../utils/data";
import { PROFILES } from "../../../../constants/admin";

export const roles = ["Admin", "Project Manager", "User"];

const getUsers = async () => {
  const users = await genUser(10);
  return users.map((user, i) => {
    const role = i % roles.length;
    return {
      name: user.name,
      url: user.image || user.url,
      email: user.email,
      role,
      teamName: "Team name",
    };
  });
};

const ProjectUsers = () => {
  return (
    <>
      <UsersTable rows={getUsers} />
    </>
  );
};

const ProjectDocuments = () => {
  return (
    <>
      <DocumentsTable rows={genDocuments} />
    </>
  );
};

const tabs = [
  {
    title: "Project Users",
    pane: ProjectUsers,
    value: PROFILES.PROJECT_USERS,
  },
  {
    title: "Project Documents",
    pane: ProjectDocuments,
    value: PROFILES.PROJECT_DOCS,
  },
];

const Project = () => {
  return (
    <div>
      <TabContext tabs={tabs}>
        <div className="d-flex align-items-center gap-4">
          <div className="flex-grow-1">
            <TabContext.Tabs
              renderTab={({ tab }) => {
                return (
                  <div className="d-flex align-items-center">
                    <span>{tab.title}</span>
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
            {tabs.map((tab, i) => {
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
