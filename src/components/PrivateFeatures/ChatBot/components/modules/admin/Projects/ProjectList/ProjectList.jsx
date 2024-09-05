import { useMemo } from "react";

import { queries, useAdmin } from "../../../../../hooks";

import ProjectsTable from "./Table";

const ProjectList = () => {
  const { createProject } = useAdmin();
  const { data, loading } = queries.useGetProjectsQuery();

  const rows = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => ({
      ...item,
      assignedUsers: Array.from({ length: item.userCount }, () => {
        return {
          url: "",
          name: "",
        };
      }),
    }));
  }, [data?.data]);

  return (
    <ProjectsTable
      rows={rows}
      isLoading={loading}
      insertingRow={createProject.loading}
    />
  );
};

export default ProjectList;
