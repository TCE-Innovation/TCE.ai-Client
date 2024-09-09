import React, { useMemo } from "react";

import TeamTable from "./Table";

import { filterByPatternsFactory } from "../../../../../../utils/form";
import { useFieldValue } from "../../../../../contexts/FormContext";

import { useGetUsersQuery } from "../../../../../../hooks/queries";

const Team = () => {
  const { value: search } = useFieldValue("search");
  //placeholder call
  const { data, loading } = useGetUsersQuery();

  const rows = useMemo(() => {
    if (!data) return [];
    const users = data.data;
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
