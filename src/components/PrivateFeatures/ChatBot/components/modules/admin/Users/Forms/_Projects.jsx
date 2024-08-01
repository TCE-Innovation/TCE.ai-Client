import React from "react";
import { SelectField } from "../../../../common/field";

const _Projects = () => {
  return (
    <div>
      <SelectField
        name={"projects"}
        label={"Projects assigned to"}
        placeholder={"Projects assigned to"}
        extractor={(item) => item}
        items={[]}
      />
    </div>
  );
};

export default _Projects;
