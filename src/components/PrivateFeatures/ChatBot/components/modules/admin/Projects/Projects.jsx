import React from "react";

import Wrapper from "./style";

import { TabContext } from "../../../common";

import { RightIcon } from "../../../icons";

import ProjectsTable from "./Table";

import Project from "./Project";

import { genRandomId } from "../../../../utils/uuid";

const genProject = () => {
  const alphs = "abcdefghijklmnopqrstuvqxyz";
  return Array.from({ length: 20 }, (_, i) => {
    const id = genRandomId();
    const name = `${alphs[i].toUpperCase()} Project`;
    const value =
      name
        .replace(/\s+/g, "")
        .split("")
        .reduce((acc, i) => (acc += Math.sqrt(i.charCodeAt(0)) | 0), 23) % 21;
    return {
      id,
      name: `${alphs[i].toUpperCase()} Project`,
      assignedUsers: Array.from({ length: value + 5 }, () => ({
        name: "name",
        url: "",
      })),
      documentCount: alphs[i].charCodeAt(0),
    };
  });
};

const projects = genProject();

const tabs = [
  {
    title: "Project list",
  },
  {
    title: "Project name",
  },
];

const Projects = () => {
  return (
    <Wrapper>
      <TabContext tabs={tabs.map((t) => t.title)}>
        <TabContext.Tabs
          disableUnderline
          renderTab={({ tab, tabIndex, activeTab }) => {
            return (
              <button
                style={{ color: "var(--chatbot-grey)" }}
                className="chat-button d-flex align-items-center"
              >
                {tabIndex !== 0 && (
                  <span
                    className="d-inline-block"
                    style={{ pointerEvents: "none", paddingRight: ".75em" }}
                  >
                    <RightIcon />
                  </span>
                )}
                <span
                  style={{
                    color:
                      tabIndex === activeTab ? "var(--chatbot-primary)" : "",
                  }}
                >
                  {tab}
                </span>
              </button>
            );
          }}
        />
        <TabContext.Panes>
          <ProjectsTable rows={projects} />
          <Project />
        </TabContext.Panes>
      </TabContext>
    </Wrapper>
  );
};

export default Projects;
