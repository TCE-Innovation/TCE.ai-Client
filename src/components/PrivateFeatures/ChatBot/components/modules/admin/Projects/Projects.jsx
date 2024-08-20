import React from "react";

import Wrapper from "./style";

import { TabContext } from "../../../common";

import Project from "./Project";

import Navigator from "./Navigator";

import { useGlobal } from "../../../../hooks";

import { PROFILES } from "../../../../constants/admin";

import ProjectList from "./ProjectList";

const Projects = () => {
  const { query } = useGlobal();
  const { push, params } = query;

  const { project_id } = params;

  const tabs = [
    {
      title: "Project list",
      value: PROFILES.PROJECT_LIST,
      handleClick: () => {
        push({ project_id }, { reverse: true });
      },
      pane: ProjectList,
    },
    {
      title: "Project name",
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
                  return <Component />;
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
