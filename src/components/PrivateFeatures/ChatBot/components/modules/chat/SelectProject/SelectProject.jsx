import React, { useMemo } from "react";
import { SelectField } from "../../../common/field";
import FormContext from "../../../contexts/FormContext";

import { useGetProjectsQuery } from "../../../../hooks/useQueries";
import useConversation from "../../../../hooks/useConversation";

const SelectProject = () => {
  const { data, loading } = useGetProjectsQuery();
  const { setSelectedProjectId, selectedProjectId } = useConversation();

  const items = useMemo(() => {
    if (!data?.data) return [];
    const { data: projects } = data;
    return projects.map((project) => ({
      label: project.name,
      value: project.id,
    }));
  }, [data?.data]);

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
          onChange={(projectId) => setSelectedProjectId(projectId)}
        />
      </FormContext>
    </>
  );
};

export default SelectProject;
