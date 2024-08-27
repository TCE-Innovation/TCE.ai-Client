import React, { useMemo } from "react";

import SearchComponent from "../Search";

import UsersTable from "./Table";
import { queries, useAdmin } from "../../../../hooks";

import { filterByPatternsFactory } from "../../../../utils/form";
import { useFieldValue } from "../../../contexts/FormContext";

const Users = () => {
  const { addUser } = useAdmin();
  const { value: search } = useFieldValue("search");
  const { data, loading } = queries.useGetUsersQuery();

  const rows = useMemo(() => {
    if (!data?.data) return [];
    const results = data.data;
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(
        search,
        "name",
        "email"
      );
      return filterByNameAndEmail(results);
    }
    return results;
  }, [data, search]);

  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent placeholder={"Search users by email"} />
      </div>
      <UsersTable
        rows={rows}
        isLoading={loading}
        insertingRow={addUser.loading}
      />
    </>
  );
};

export default Users;
