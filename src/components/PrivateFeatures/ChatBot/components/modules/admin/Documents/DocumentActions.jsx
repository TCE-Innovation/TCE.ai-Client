import React from "react";
import { TabContext } from "../../../common";
import { PROFILES } from "../../../../constants/admin";
import Actions from "../Actions";
import { RemoveDocumentFromProjectModal } from "../Projects/Modals";
import { RemoveDocumentModal } from "./Modals";
import { mutations } from "../../../../hooks";

const DocumentActions = ({ ...documentProps }) => {
  const deleteDocument = mutations.useDeleteDocument();
  return (
    <>
      <TabContext.Provider>
        {(props) => {
          const { activeTab, tabs } = props;
          const isProjectDocs = tabs[activeTab].value === PROFILES.PROJECT_DOCS;
          return (
            <Actions>
              <Actions.DownLoad
                handleDownload={() => console.log("downloading...")}
              />
              <Actions.Delete
                disabled={deleteDocument.loading}
                renderModal={(modalProps) => {
                  if (isProjectDocs)
                    return (
                      <RemoveDocumentFromProjectModal
                        {...modalProps}
                        {...documentProps}
                        deleteDocument={deleteDocument}
                      />
                    );
                  return (
                    <RemoveDocumentModal {...modalProps} {...documentProps} />
                  );
                }}
              />
            </Actions>
          );
        }}
      </TabContext.Provider>
    </>
  );
};

export default DocumentActions;
