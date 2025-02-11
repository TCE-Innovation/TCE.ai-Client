import React, { useMemo } from "react";
import SortButton from "../../../SortButton";

import ProjectUserActions from "./Actions";
import TableContainer from "../../../TableContainer";
import { Badge, Avatar } from "../../../../../common";

import { ROLE_TO_COLORS } from "../../../../../../constants/admin";

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
        renderCell: ({ name, image_url, email }) => {
          if (!name) return "/";
          return (
            <div className="d-flex gap-2 align-items-center">
              {image_url && (
                <Avatar title={""}>
                  <img src={image_url} alt={email} />
                </Avatar>
              )}
              <div>{name}</div>
            </div>
          );
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
          return <ProjectUserActions {...userProps} />;
        },
      },
    ],
    []
  );
  return <TableContainer columns={columns} rows={rows} {...props} />;
};

export default Table;
