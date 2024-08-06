import React, { useMemo } from "react";
import SortButton from "../SortButton";
import AvatarGroup from "./AvatarGroup";
import Actions from "../Actions";
import { DeleteProjectModal, EditProjectModal } from "./Modals";

import TableContainer from "../TableContainer";
import { TabContext } from "../../../common";

import { useGlobal } from "../../../../hooks";

const Table = ({ rows }) => {
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
        renderCell: ({ name }) => {
          return (
            <Actions>
              <Actions.Delete
                renderModal={(props) => (
                  <DeleteProjectModal {...props} projectName={name} />
                )}
              />
              <Actions.Edit
                renderModal={(props) => <EditProjectModal {...props} />}
              />
            </Actions>
          );
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
            push({ project_id: row.id });
          }}
        />
      )}
    </TabContext.Provider>
  );
};

export default Table;
