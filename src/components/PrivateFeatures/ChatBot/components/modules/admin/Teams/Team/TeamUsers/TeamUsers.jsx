import React, { useMemo } from "react";

import TeamTable from "./Table";

import { filterByPatternsFactory } from "../../../../../../utils/form";
import { useFieldValue } from "../../../../../contexts/FormContext";

import { useGetTeamUsersQuery } from "../../../../../../hooks/queries";
import { useGlobal } from "../../../../../../hooks";

const Team = () => {
  const { value: search } = useFieldValue("search");
  const { query } = useGlobal();
  const { params } = query;
  const { team_id: teamId = null } = params;
  const { data, loading } = useGetTeamUsersQuery(
    { teamId },
    { disableRunOnMount: teamId === null }
  );

  const rows = useMemo(() => {
    if (!data) return [];
    const users = data.data?.users || [];
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(
        search,
        "name",
        "email"
      );
      return filterByNameAndEmail(users);
    }
    return users;
  }, [data, search]);

  return (
    <>
      <TeamTable
        rows={rows}
        isLoading={loading}
        style={{
          height: "600px",
        }}
      />
    </>
  );
};

export default Team;
