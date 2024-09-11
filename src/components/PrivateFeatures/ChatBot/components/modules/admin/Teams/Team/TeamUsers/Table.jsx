import React, { useMemo } from "react";

import TableContainer from "../../../TableContainer";
import SortButton from "../../../SortButton";
import { Badge } from "../../../../../common";

import { ROLE_TO_COLORS } from "../../../../../../constants/admin";

import TeamUserTableActions from "./Actions";

const Table = ({ rows, ...props }) => {
  const columns = useMemo(
    () => [
      {
        title: "Name",
        sort: true,
        key: "name",
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
        renderCell: ({ name }) => {
          if (!name) return "/";
          return name;
        },
      },
      {
        title: "Email",
        key: "email",
        align: "end",
        width: "0",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
      },
      {
        title: "Role",
        align: "end",
        renderCell: ({ role }) => {
          if (!role) return "N/A";
          const color = ROLE_TO_COLORS[role];
          return (
            <>
              <Badge label={role} accent={color} />
            </>
          );
        },
      },
      {
        title: "Actions",
        align: "end",
        renderCell: ({ ...userProps }) => {
          return <TeamUserTableActions {...userProps} />;
        },
      },
    ],
    []
  );
  return (
    <>
      <TableContainer columns={columns} rows={rows} {...props} />
    </>
  );
};

export default Table;
