import React, { useMemo } from "react";

import TableContainer from "../TableContainer";
import SortButton from "../SortButton";
import { Avatar, Badge } from "../../../common";
import Actions from "../Actions";
import { RemoveUserModal } from "./Modals";

export const roles = ["Admin", "Project Manager", "User"];
const colors = ["purple", "blue", "green"];

const Table = ({ rows }) => {
  const columns = useMemo(
    () => [
      {
        title: "User name",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
        renderCell: ({ name }) => {
          const title = name[0]?.toUpperCase();
          return (
            <div className="d-flex gap-1 align-items-center">
              <Avatar title={title} />
              <span>{name}</span>
            </div>
          );
        },
      },
      {
        title: "Email",
        key: "email",
      },
      {
        title: "Role",
        renderCell: ({ role }) => {
          const color = colors[role];
          const label = roles[role];
          return (
            <>
              <Badge label={label} accent={color} />
            </>
          );
        },
      },
      {
        title: "Team",
        renderCell: ({ teamName }) => {
          return <Badge accent={"yellow"} label={teamName} />;
        },
      },
      {
        title: "Actions",
        width: "0",
        renderCell: ({ name, email }) => {
          return (
            <Actions>
              <Actions.Delete
                renderModal={(props) => (
                  <RemoveUserModal {...props} username={name} email={email} />
                )}
              />
            </Actions>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <TableContainer columns={columns} rows={rows} />
    </>
  );
};

export default Table;
