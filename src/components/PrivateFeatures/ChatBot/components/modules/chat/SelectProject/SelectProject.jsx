import React, { useEffect, useMemo } from "react";
import { SelectField } from "../../../common/field";
import FormContext from "../../../contexts/FormContext";

import { queries, useGlobal } from "../../../../hooks";
import useConversation from "../../../../hooks/useConversation";
import useMessage from "../../../../hooks/useMessage";

const { useGetProjectsQuery } = queries;

const SelectProject = () => {
  const { data, loading } = useGetProjectsQuery();
  const { setSelectedProjectId, selectedProjectId } = useConversation();
  const { clearMessageCache } = useMessage();
  const { query } = useGlobal();
  const { push } = query;

  const items = useMemo(() => {
    if (!data?.data) return [];
    const { data: projects } = data;
    return projects.map((project) => ({
      ...project,
      label: project.name,
      value: project.id,
    }));
  }, [data]);

  const handleChangeProject = (projectId) => {
    setSelectedProjectId(projectId);
    clearMessageCache();
  };

  useEffect(() => {
    const project = items?.find((project) => project.id === selectedProjectId);
    if (project) {
      push({ is_live: project.isLive });
    }
    push({ admin: true, profile: "", project_id: "" }, { reverse: true });
    // eslint-disable-next-line
  }, [selectedProjectId, items]);

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
