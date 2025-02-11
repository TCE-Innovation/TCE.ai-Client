import React, { useMemo } from "react";
import SortButton from "../../SortButton";
import AvatarGroup from "../../AvatarGroup";

import ProjectActions from "./Actions";
import TableContainer from "../../TableContainer";
import { TabContext } from "../../../../common";

import { useGlobal } from "../../../../../hooks";

const Table = ({ rows, ...props }) => {
  const { query } = useGlobal();

  const { push } = query;
  const columns = useMemo(
    () => [
      {
        title: "Project Name",
        key: "name",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
      },
      {
        title: "User assigned",
        renderCell: ({ assignedUsers }) => {
          if (!assignedUsers.length)
            return (
              <span style={{ color: "var(--chatbot-grey)" }}>
                not available
              </span>
            );
          return <AvatarGroup avatars={assignedUsers} />;
        },
      },
      {
        title: "Documents",
        renderCell: ({ documentCount }) => {
          return <>{documentCount} Documents</>;
        },
      },
      {
        title: "Actions",
        width: "0px",
        renderCell: ({ ...projectProps }) => {
          return <ProjectActions {...projectProps} />;
        },
      },
    ],
    []
  );
  return (
    <TabContext.Provider>
      {({ nextTab }) => (
        <TableContainer
          columns={columns}
          rows={rows}
          onRowClick={(row) => {
            nextTab();
            push({ project_id: row.id, is_live: row.is_live });
          }}
          {...props}
        />
      )}
    </TabContext.Provider>
  );
};

export default Table;
