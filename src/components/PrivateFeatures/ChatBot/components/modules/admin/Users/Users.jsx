import React, { useMemo } from "react";

import SearchComponent from "../Search";

import UsersTable from "./Table";
import { queries, useAdmin, useGlobal } from "../../../../hooks";

import { filterByPatternsFactory } from "../../../../utils/form";
import { useFieldValue } from "../../../contexts/FormContext";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const { query } = useGlobal();
  const { params } = query;
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
        onRowClick={(row) => {
          const newParams = {
            ...params,
            mode: "preview",
            user_id: row.id,
          };

          navigate(
            {
              search: new URLSearchParams(newParams).toString(),
            },
            { replace: true }
          );
        }}
      />
    </>
  );
};

export default Users;
