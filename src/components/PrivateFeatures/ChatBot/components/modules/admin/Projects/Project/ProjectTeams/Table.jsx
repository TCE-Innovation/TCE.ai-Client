import React, { useMemo } from "react";

import TableContainer from "../../../TableContainer";

import ProjectTeamsTableActions from "./Actions";
import AvatarGroup from "../../../AvatarGroup";
import { useGlobal } from "../../../../../../hooks";
import SortButton from "../../../SortButton";

const Table = ({ rows, ...props }) => {
  const { query } = useGlobal();

  const { push } = query;

  const columns = useMemo(
    () => [
      {
        title: "Team Name",
        key: "teamName",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
      },
      {
        title: "Members",
        key: "users",
        align: "end",
        width: "0",
        renderCell: ({ users }) => {
          if (!users?.length) return <>-</>;
          return <AvatarGroup avatars={users} />;
        },
      },
      {
        title: "Actions",
        align: "end",
        renderCell: ({ ...teamProps }) => {
          return <ProjectTeamsTableActions {...teamProps} />;
        },
      },
    ],
    []
  );
  return (
    <>
      <TableContainer
        columns={columns}
        rows={rows}
        onRowClick={(row) => {
          push({ team_id: row.id });
        }}
        style={{ height: "600px" }}
        {...props}
      />
    </>
  );
};

export default Table;
