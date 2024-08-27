import React, { useMemo } from "react";

import TableContainer from "../TableContainer";
import SortButton from "../SortButton";
import { Avatar, Badge } from "../../../common";

import { ROLE_TO_COLORS } from "../../../../constants/admin";

import UserTableActions from "./Actions";

const Table = ({ rows, ...props }) => {
  const columns = useMemo(
    () => [
      {
        title: "Name",
        sort: true,
        key:"name",
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
        renderCell: ({ name, url }) => {
          if(!name) return "/"
          return name
          // const title = name[0]?.toUpperCase();
          // return (
          //   <div className="d-flex gap-1 align-items-center">
          //     <Avatar title={title}>
          //       <img src={url} alt={name} />
          //     </Avatar>
          //     {name ? (
          //       <span>{name}</span>
          //     ) : (
          //       <span style={{ color: "var(--chatbot-grey)" }}>
          //         /
          //       </span>
          //     )}
          //   </div>
          // );
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
          return <UserTableActions {...userProps} />;
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
