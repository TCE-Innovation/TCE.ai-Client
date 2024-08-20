import { useMemo } from "react";
import { useGetProjectsQuery } from "../../../../hooks/useQueries";

import ProjectsTable from "./Table";

const ProjectList = () => {
  const { data, loading } = useGetProjectsQuery();

  const rows = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => {
      return {
        name: item.name,
        assignedUsers: Array.from({ length: item.user_count }, () => {
          return {
            url: "",
            name: "",
          };
        }),
        documentCount: item.document_count,
        id: item.id,
      };
    });
  }, [data?.data]);

  return <ProjectsTable rows={rows} isLoading={loading} />;
};

export default ProjectList;
