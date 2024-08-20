import { useMemo } from "react";
import { useGlobal } from "../../../../hooks";
import { filterByPatternsFactory } from "../../../../utils/form";
import { useGetProjectUsersQuery } from "../../../../hooks/useQueries";

import UsersTable from "../Users/Table";
import { useFieldValue } from "../../../contexts/FormContext";

const ProjectUsers = () => {
  const { query } = useGlobal();
  const { params } = query;

  const { value: userName } = useFieldValue("userSearch");

  const { project_id = null, isLive = null } = params;

  const { data, loading } = useGetProjectUsersQuery(
    { projectId: project_id },
    { disableRunOnMount: project_id === null }
  );

  const rows = useMemo(() => {
    if (!data?.data) return [];
    const results = data.data.map((item) => {
      return {
        ...item,
        name: [item.first_name, item.last_name].join(" ").trim(),
        email: item.email,
        role: item.role,
        id: item.id,
        url: "",
      };
    });
    const filterByEmailAndUserName = filterByPatternsFactory(
      userName,
      "name",
      "email"
    );
    if (isLive === null) return filterByEmailAndUserName(results);
    return filterByEmailAndUserName(
      results.filter((item) => item.is_live.toString() === isLive)
    );
  }, [data?.data, isLive, userName]);

  return (
    <>
      <UsersTable rows={rows} isLoading={loading} />
    </>
  );
};

export default ProjectUsers;
