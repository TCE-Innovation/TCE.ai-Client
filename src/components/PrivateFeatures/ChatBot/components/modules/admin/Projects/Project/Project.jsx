import React from "react";

import AddNew from "../../AddNew";
import SearchComponent from "../../Search";

import { TabContext } from "../../../../common";

import { PROFILES } from "../../../../../constants/admin";

import ProjectUsers from "./ProjectUsers";
import ProjectDocuments from "./ProjectDocuments";
import ProjectTeams from "./ProjectTeams";
import ProjectStatus from "./ProjectStatus";

import FormContext from "../../../../contexts/FormContext";

import AdminGuard from "../../../../auth/Admin";
import { permissionService } from "../../../../../services";

const SearchAndModal = ({ tabs, activeTab }) => {
  const tab = tabs[activeTab] || null;
  if (!tab) return null;
  const { searchProps, Modal = () => null } = tab;
  return (
    <>
      <div className="flex-grow-1">
        <SearchComponent {...searchProps} />
      </div>
      <div>
        <Modal />
      </div>
    </>
  );
};

const Project = () => {
  const hasProjectUserReadPermission = permissionService.getProjectUserPermission(
    permissionService.permission.READ
  );
  const hasProjectDocumentReadPermission = permissionService.getProjectDocumentPermission(
    permissionService.permission.READ
  );
  const hasProjectTeamReadPermission = permissionService.getProjectTeamPermission(
    permissionService.permission.READ
  );

  const tabs = [
    hasProjectUserReadPermission && {
      title: "Users",
      pane: ProjectUsers,
      value: PROFILES.PROJECT_USERS,
      searchProps: {
        placeholder: "Search users by email",
        name: "userSearch",
      },
      Modal: AddNew.UserToProject,
    },
    hasProjectDocumentReadPermission && {
      title: "Documents",
      pane: ProjectDocuments,
      value: PROFILES.PROJECT_DOCS,
      searchProps: {
        placeholder: "Search a document",
        name: "documentSearch",
      },
      Modal: AddNew.DocumentToProject,
    },
    hasProjectTeamReadPermission && {
      title: "Teams",
      pane: ProjectTeams,
      value: PROFILES.PROJECT_TEAMS,
      searchProps: {
        placeholder: "Search a team",
        name: "teamSearch",
      },
      Modal: AddNew.TeamToProject,
    },
  ].filter(Boolean);

  return (
    <div>
      <FormContext
        initialValues={{ documentSearch: "", userSearch: "", teamSearch: "" }}
      >
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
              {({ activeTab, tabs }) => {
                return <SearchAndModal tabs={tabs} activeTab={activeTab} />;
              }}
            </TabContext.Provider>
          </div>
          <div>
            <TabContext.Panes>
              {tabs.map((tab, i) => {
                const Component = tab.pane;
                return (
                  <AdminGuard key={i}>
                    <Component />;
                  </AdminGuard>
                );
              })}
            </TabContext.Panes>
          </div>
        </TabContext>
      </FormContext>
    </div>
  );
};

export default Project;
