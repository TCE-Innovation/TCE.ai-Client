import React, { useMemo } from "react";
import SortButton from "../SortButton";
import Actions from "../Actions";
import { RemoveDocumentModal } from "./Modals";

import TableContainer from "../TableContainer";

const Table = ({ rows }) => {
  const columns = useMemo(
    () => [
      {
        title: "Document name",
        key: "name",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
      },
      {
        title: "Upload date",
        key: "uploadDate",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
      },
      {
        title: "Actions",
        width: "0",
        renderCell: ({ ...props }) => {
          return (
            <Actions>
              <Actions.DownLoad
                handleDownload={() => console.log("downloading...")}
              />
              <Actions.Delete
                renderModal={(modalProps) => (
                  <RemoveDocumentModal {...modalProps} {...props} />
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
