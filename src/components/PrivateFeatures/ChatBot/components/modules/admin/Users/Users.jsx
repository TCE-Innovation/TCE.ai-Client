import React from "react";

import SearchComponent from "../Search";

import UsersTable from "./Table";

import { genUser } from "../../../../utils/data";

import { ROLES } from "../../../../constants/admin";

const getUsers = async () => {
  const users = await genUser(20);
  return users.map((user, i) => {
    const role = i % ROLES.length;
    return {
      name: user.name,
      url: user.image || user.url,
      email: user.email,
      role,
      teamName: "Team name",
    };
  });
};

const Users = () => {
  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent placeholder={"Search a user"} onChange={console.log} />
      </div>
      <UsersTable rows={getUsers} />
    </>
  );
};

export default Users;
