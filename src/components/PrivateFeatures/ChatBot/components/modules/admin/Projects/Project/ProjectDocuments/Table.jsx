import React, { useMemo } from "react";
import SortButton from "../../../SortButton";

import { formatDate } from "../../../../../../utils/date";

import TableContainer from "../../../TableContainer";

import DocumentAction from "./Actions";

const Table = ({ rows, ...props }) => {
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
        renderCell: ({ name }) => {
          return (
            <div className="tooltip-container">
              <div
                style={{
                  textWrap: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  maxWidth: "500px",
                }}
              >
                {name}
              </div>
              <div className="tooltip tooltip-dark align-bottom">{name}</div>
            </div>
          );
        },
      },
      {
        title: "Uploaded By",
        renderCell: ({ uploadedBy = "" }) => {
          if (uploadedBy) return <div>{uploadedBy}</div>;
          return "/";
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
        renderCell: ({ uploadDate }) => {
          const formattedDate = formatDate(new Date(uploadDate), "MM.dd.yyyy");
          return <>{formattedDate}</>;
        },
      },
      {
        title: "Actions",
        align: "end",
        renderCell: ({ ...documentProps }) => {
          return <DocumentAction {...documentProps} />;
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
