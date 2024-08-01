import React from "react";

import SearchComponent from "../Search";

import UsersTable, { roles } from "./Table";

const data = Array.from({ length: 20 }, (_, i) => {
  const role = i % roles.length;
  return {
    name: `${i + 1} user name`,
    email: "user123@gmail.com",
    role,
    teamName: "Team name",
  };
});

const Users = () => {
  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent placeholder={"Search a user"} onChange={console.log} />
      </div>
      <UsersTable rows={data} />
    </>
  );
};

export default Users;
