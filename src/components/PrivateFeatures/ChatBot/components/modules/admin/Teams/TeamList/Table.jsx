import React, { useMemo } from "react";

import TableContainer from "../../TableContainer";

import TeamsTableActions from "./Actions";
import AvatarGroup from "../../AvatarGroup";
import { useAdmin, useGlobal } from "../../../../../hooks";
import SortButton from "../../SortButton";

const Table = ({ rows, ...props }) => {
  const { createTeamObject } = useAdmin();
  const { loading: isCreatingTeam } = createTeamObject;
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
          if (!users.length)
            return (
              <span style={{ color: "var(--chatbot-grey)" }}>
                not available
              </span>
            );
          return <AvatarGroup avatars={users} />;
        },
      },
      {
        title: "Actions",
        align: "end",
        renderCell: ({ ...teamProps }) => {
          return <TeamsTableActions {...teamProps} />;
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
        insertingRow={isCreatingTeam}
        {...props}
      />
    </>
  );
};

export default Table;
