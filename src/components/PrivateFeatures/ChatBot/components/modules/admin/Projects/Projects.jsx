import React, { useMemo } from "react";

import Wrapper from "./style";

import { TabContext } from "../../../common";

import Navigator from "../Navigator";

import { useGlobal } from "../../../../hooks";

import { PROFILES } from "../../../../constants/admin";

import Project from "./Project";
import ProjectList from "./ProjectList";
import { useGetProjectsQuery } from "../../../../hooks/queries";

import AdminGuard from "../../../auth/Admin";

const Projects = () => {
  const { query } = useGlobal();
  const { data, loading } = useGetProjectsQuery();
  const { push, params } = query;

  const { project_id, is_live } = params;

  const projectName = useMemo(() => {
    if (!data || loading) return "";
    const projects = data.data;
    return (
      projects.find((item) => {
        return item.id === project_id;
      })?.name || "Project Name"
    );
  }, [data, project_id, loading]);

  const tabs = [
    {
      title: "Project list",
      value: PROFILES.PROJECT_LIST,
      handleClick: () => {
        push({ project_id, is_live }, { reverse: true });
      },
      pane: ProjectList,
    },
    {
      title: projectName,
      value: PROFILES.PROJECT_NAME,
      pane: Project,
    },
  ];

  return (
    <Wrapper>
      <TabContext defaultActive={project_id ? 1 : 0} tabs={tabs}>
        <Navigator />
        <TabContext.Panes>
          {tabs.map((tab, i) => {
            const Component = tab.pane;
            return (
              <TabContext.Provider key={i}>
                {({ activeTab }) => {
                  if (i !== activeTab) return null;
                  return (
                    <AdminGuard key={i}>
                      <Component />
                    </AdminGuard>
                  );
                }}
              </TabContext.Provider>
            );
          })}
        </TabContext.Panes>
      </TabContext>
    </Wrapper>
  );
};

export default Projects;
