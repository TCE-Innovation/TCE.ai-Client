import React, { useMemo } from "react";
import { SelectField } from "../../../common/field";
import FormContext from "../../../contexts/FormContext";

import { queries } from "../../../../hooks";
import useConversation from "../../../../hooks/useConversation";
import useMessage from "../../../../hooks/useMessage";

const { useGetProjectsQuery } = queries;

const SelectProject = () => {
  const { data, loading } = useGetProjectsQuery();
  const { setSelectedProjectId, selectedProjectId } = useConversation();
  const { clearMessageCache } = useMessage();

  const items = useMemo(() => {
    if (!data?.data) return [];
    const { data: projects } = data;
    return projects.map((project) => ({
      label: project.name,
      value: project.id,
    }));
  }, [data?.data]);

  const handleChangeProject = (projectId) => {
    setSelectedProjectId(projectId);
    clearMessageCache();
  };

  return (
    <>
      <FormContext initialValues={{ projectId: selectedProjectId }}>
        <SelectField
          items={items}
          extractor={(item) => item}
          name={"projectId"}
          placeholder={"Select a project"}
          search
          loading={loading}
          searchPlaceholder={"Search a project"}
          searchLabel={"Select a project"}
          onChange={handleChangeProject}
        />
      </FormContext>
    </>
  );
};

export default SelectProject;
