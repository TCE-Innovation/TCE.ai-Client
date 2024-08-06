import React, { useMemo } from "react";
import SortButton from "../SortButton";
import Actions from "../Actions";
import { RemoveDocumentModal } from "./Modals";
import { RemoveDocumentFromProjectModal } from "../Projects/Modals";

import { TabContext } from "../../../common";

import TableContainer from "../TableContainer";
import { PROFILES } from "../../../../constants/admin";

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
        renderCell: ({ ...documentProps }) => {
          return (
            <TabContext.Provider>
              {(props) => {
                const { activeTab, tabs } = props;
                const isProjectDocs =
                  tabs[activeTab].value === PROFILES.PROJECT_DOCS;
                return (
                  <Actions>
                    <Actions.DownLoad
                      handleDownload={() => console.log("downloading...")}
                    />
                    <Actions.Delete
                      renderModal={(modalProps) => {
                        if (isProjectDocs)
                          return (
                            <RemoveDocumentFromProjectModal
                              {...modalProps}
                              {...documentProps}
                            />
                          );
                        return (
                          <RemoveDocumentModal
                            {...modalProps}
                            {...documentProps}
                          />
                        );
                      }}
                    />
                  </Actions>
                );
              }}
            </TabContext.Provider>
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
