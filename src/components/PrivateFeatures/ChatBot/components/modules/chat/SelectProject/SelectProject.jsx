import React from "react";
import { SelectField } from "../../../common/field";
import FormContext from "../../../contexts/FormContext";

const projects = [
  {
    label: "ADA Package 4",
    value: 1,
  },
  {
    label: "ADA Package 3",
    value: 2,
  },
  {
    label: "ADA Package 2",
    value: 3,
  },
];

const SelectProject = () => {
  return (
    <>
      <FormContext initialValues={{ projectId: null }}>
        <SelectField
          items={projects}
          extractor={(item) => item}
          name={"projectId"}
          placeholder={"Select a project"}
          search
          searchPlaceholder={"Search a project"}
          searchLabel={"Select a project"}
          onChange={(projectId) => console.log("selected project", projectId)}
        />
      </FormContext>
    </>
  );
};

export default SelectProject;
