import React, { useMemo } from "react";
import { SelectField } from "../../../common/field";
import FormContext from "../../../contexts/FormContext";
import { useChat } from "../../../contexts/Conversation";

const SelectProject = () => {
  const { projects, currentProject, selectProject, loading } = useChat();

  const items = useMemo(() => {
    if (!projects) return [];
    return projects.map((project) => ({
      ...project,
      label: project.name,
      value: project.id,
    }));
  }, [projects]);

  const handleChangeProject = (projectId) => {
    selectProject(projectId);
  };

  if (!currentProject || !projects.length) {
    return null; // or a loader/spinner if you prefer
  }

  return (
    <FormContext initialValues={{ projectId: currentProject }}>
      <SelectField
        items={items}
        extractor={(item) => item}
        name={"projectId"}
        placeholder={"Select a project"}
        search
        loading={loading.projects}
        searchPlaceholder={"Search a project"}
        searchLabel={"Select a project"}
        onChange={handleChangeProject}
        value={currentProject}
      />
    </FormContext>
  );
};

export default SelectProject;
