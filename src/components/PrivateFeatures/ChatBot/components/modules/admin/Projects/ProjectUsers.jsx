import { useMemo } from "react";
import { useGlobal } from "../../../../hooks";
import { filterByPatternsFactory } from "../../../../utils/form";
import { queries, useAdmin } from "../../../../hooks";

import UsersTable from "../Users/Table";
import { useFieldValue } from "../../../contexts/FormContext";

const ProjectUsers = () => {
  const { query } = useGlobal();
  const { addUserToProject } = useAdmin();
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

  return (
    <>
      <UsersTable
        rows={rows}
        isLoading={loading}
        insertingRow={addUserToProject.loading}
        style={{ height: "600px" }}
      />
    </>
  );
};

export default ProjectUsers;
