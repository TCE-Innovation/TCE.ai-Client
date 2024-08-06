import React from "react";

import Wrapper from "./style";

import { TabContext } from "../../../common";

import ProjectsTable from "./Table";

import Project from "./Project";

import Navigator from "./Navigator";

import { genProject } from "../../../../utils/data";

import { useGlobal } from "../../../../hooks";

import { PROFILES } from "../../../../constants/admin";

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
    },
    {
      title: "Project name",
      value: PROFILES.PROJECT_NAME,
    },
  ];

  return (
    <Wrapper>
      <TabContext defaultActive={project_id ? 1 : 0} tabs={tabs}>
        <Navigator />
        <TabContext.Panes>
          <ProjectsTable rows={genProject} />
          <Project />
        </TabContext.Panes>
      </TabContext>
    </Wrapper>
  );
};

export default Projects;
