import { useMemo } from "react";
import { filterByPatternsFactory } from "../../../../../../utils/form";
import { queries, useAdmin, useGlobal } from "../../../../../../hooks";

import UsersTable from "./Table";
import { useFieldValue } from "../../../../../contexts/FormContext";
import { permissionService } from "../../../../../../services";
import { PERMISSIONS } from "../../../../../../constants/permissions";
import Restricted from "../../../Restricted";

const ProjectUsers = () => {
  const hasProjectUserReadPermission = permissionService.getProjectUserPermission(
    PERMISSIONS.READ
  );
  const { query } = useGlobal();
  const { addUserToProjects } = useAdmin();
  const { params } = query;

  const { value: userName } = useFieldValue("userSearch");

  const { project_id = null, isLive = null } = params;

  const { data, loading } = queries.useGetProjectUsersQuery(
    { projectId: project_id },
    { disableRunOnMount: project_id === null }
  );

  const rows = useMemo(() => {
    if (!data?.data) return [];
    const results = data.data;
    const filterByEmailAndUserName = filterByPatternsFactory(
      userName,
      "name",
      "email"
    );
    if (isLive === null) return filterByEmailAndUserName(results);
    return filterByEmailAndUserName(results);
  }, [data?.data, isLive, userName]);

  if (!hasProjectUserReadPermission) return <Restricted />;

  return (
    <>
      <UsersTable
        rows={rows}
        isLoading={loading}
        insertingRow={addUserToProjects.loading}
        style={{ height: "600px" }}
      />
    </>
  );
};

export default ProjectUsers;
