import React from "react";

import AddNew from "../AddNew";
import SearchComponent from "../Search";

import SwitchMode from "./SwitchMode";

import { TabContext } from "../../../common";

import { PROFILES } from "../../../../constants/admin";

import ProjectUsers from "./ProjectUsers";
import ProjectDocuments from "./ProjectDocuments";
import { useGlobal } from "../../../../hooks";

import FormContext from "../../../contexts/FormContext";

export const roles = ["Admin", "Project Manager", "User"];

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

const SwitchModeContext = ({ children }) => {
  const { query } = useGlobal();
  const { push, params } = query;
  const { isLive = "true" } = params;

  const handleChangeLiveProjects = () => {
    if (isLive === "true") {
      push({ isLive: true }, { reverse: true });
    } else {
      push({ isLive: true });
    }
  };
  const tabs = [
    {
      title: "Live",
      handleClick: () => {
        handleChangeLiveProjects();
      },
      value: PROFILES.LIVE_MODE,
    },
    {
      title: "Proposal",
      handleClick: () => handleChangeLiveProjects(),
      value: PROFILES.PROPOSAL_MODE,
    },
  ];
  return <TabContext tabs={tabs}>{children}</TabContext>;
};

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
            <SwitchModeContext>
              <SwitchMode />
            </SwitchModeContext>
            <TabContext.Provider>
              {({ activeTab }) => {
                return (
                  <div className="flex-grow-1">
                    {activeTab === 0 ? (
                      <SearchComponent
                        placeholder={"Search a user"}
                        onChange={console.log}
                        name={"userSearch"}
                      />
                    ) : activeTab === 1 ? (
                      <SearchComponent
                        placeholder={"Search a document"}
                        onChange={console.log}
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
