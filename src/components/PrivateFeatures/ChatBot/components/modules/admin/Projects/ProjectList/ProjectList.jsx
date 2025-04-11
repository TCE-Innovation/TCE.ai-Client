import { useMemo } from "react";

import { queries, useAdmin } from "../../../../../hooks";

import ProjectsTable from "./Table";
import { permissionService } from "../../../../../services";
import Restricted from "../../Restricted";

const ProjectList = () => {
  const hasProjectReadPermission = permissionService.getProjectPermission(
    permissionService.permission.READ
  );
  const { createProject } = useAdmin();
  const { data, loading } = queries.useGetProjectsQuery();

  const rows = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item) => ({
      ...item,
      assignedUsers:
        item.users?.map((user) => ({
          ...user,
          url: user.image_url,
        })) || [],
    }));
  }, [data?.data]);

  if (!hasProjectReadPermission) return <Restricted />;

  return (
    <ProjectsTable
      rows={rows}
      isLoading={loading}
      insertingRow={createProject.loading}
    />
  );
};

export default ProjectList;
