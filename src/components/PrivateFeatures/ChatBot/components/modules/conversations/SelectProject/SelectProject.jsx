import React, { useState } from "react";
import { Select } from "../../../common";

import Wrapper from "./style";

const projects = [
  {
    label: "ADA Package 4",
    value: 1,
  },
];

const SelectProject = () => {
  const [currentProject, setCurrentProject] = useState(projects[0].value);
  return (
    <Wrapper>
      <Select
        items={projects}
        value={currentProject}
        handleChange={(e) => setCurrentProject(e.target.value)}
        label={"Select a Project"}
      />
    </Wrapper>
  );
};

export default SelectProject;
