import React from "react";

import AddNew from "../../AddNew";
import SearchComponent from "../../Search";

import { TabContext } from "../../../../common";

import { PROFILES } from "../../../../../constants/admin";

import ProjectUsers from "./ProjectUsers";
import ProjectDocuments from "./ProjectDocuments";
import ProjectStatus from "./ProjectStatus";

import FormContext from "../../../../contexts/FormContext";

// export const roles = ["Admin", "Project Manager", "User"];

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
      <FormContext initialValues={{ documentSearch: "", userSearch: "" }}>
        <TabContext tabs={tabs}>
          <div className="d-flex align-items-center gap-4 cb-header-height-controller">
            <div>
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
            <ProjectStatus />
            <TabContext.Provider>
              {({ activeTab }) => {
                return (
                  <div className="flex-grow-1">
                    {activeTab === 0 ? (
                      <SearchComponent
                        key={0}
                        placeholder={"Search users by email"}
                        name={"userSearch"}
                      />
                    ) : activeTab === 1 ? (
                      <SearchComponent
                        key={1}
                        placeholder={"Search a document"}
                        name={"documentSearch"}
                      />
                    ) : null}
                  </div>
                );
              }}
            </TabContext.Provider>
            <TabContext.Provider>
              {({ activeTab }) => {
                return (
                  <>
                    {activeTab === 0 ? (
                      <AddNew.UserToProject />
                    ) : activeTab === 1 ? (
                      <AddNew.DocumentToProject />
                    ) : null}
                  </>
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
      </FormContext>
    </div>
  );
};

export default Project;
