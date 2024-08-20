import React, { useMemo, useState } from "react";

import SearchComponent from "../Search";

import UsersTable from "./Table";
import { useGetUsersQuery } from "../../../../hooks/useQueries";

import FormContext from "../../../contexts/FormContext";

const Users = () => {
  const [search, setSearch] = useState("");
  const { data, loading } = useGetUsersQuery();

  const rows = useMemo(() => {
    if (!data?.data) return [];
    const results = data.data.map((item) => {
      const name = [item.first_name, item.last_name].join(" ").trim();
      return {
        name,
        email: item.email,
        role: item.role,
        id: item.id,
        url: "",
      };
    });
    if (search) {
      const pattern = new RegExp(search, "gi");
      return results.filter((record) => {
        const isMatchName = pattern.test(record.name);
        const isMatchEmail = pattern.test(record.email);
        return isMatchName || isMatchEmail;
      });
    }
    return results;
  }, [data?.data, search]);

  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <FormContext initialValues={{ search: "" }}>
          <SearchComponent
            placeholder={"Search a user"}
            onChange={(value) => {
              setSearch(value);
            }}
          />
        </FormContext>
      </div>
      <UsersTable rows={rows} isLoading={loading} />
    </>
  );
};

export default Users;
