import React, { useEffect, useState } from "react";
import { Loader, TabContext } from "../../../common";
import { PROFILES } from "../../../../constants/admin";
import Actions from "../Actions";
import { RemoveDocumentFromProjectModal } from "../Projects/Modals";
import { RemoveDocumentModal } from "./Modals";
import { mutations, useGlobal } from "../../../../hooks";

import { download } from "../../../../utils/file";

const DocumentActions = ({ ...documentProps }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { publishToSubscribers, createAlert, getSubscriberData } = useGlobal();
  const deleteDocument = mutations.useDeleteDocument();

  const context = ["documentDownload", documentProps.id].join("-");

  useEffect(() => {
    const progress = getSubscriberData(context);
    setIsDownloading(progress !== null && progress < 100);
  }, [context,getSubscriberData]);

  const getProgressMessage = (progress = 0) =>
    `Document download in progress... ${progress.toFixed(2)}% completed`;

  const handleDocumentDownloadProgress = (progress) => {
    publishToSubscribers(context, getProgressMessage(progress));
  };

  const handleDownload = async (...props) => {
    setIsDownloading(true);
    const removeAlert = createAlert({
      message: getProgressMessage(),
      type: "info",
      context: context,
      duration: 9999,
    });
    const downloader = await download(...props);
    setIsDownloading(false);
    createAlert({
      message: "download complete",
      type: "success",
    });
    setTimeout(() => {
      downloader();
      removeAlert();
    }, 1000);
  };

  if (deleteDocument.loading)
    return (
      <div className="position-relative" style={{ width: "2.5em" }}>
        <Loader />
      </div>
    );

  return (
    <>
      <TabContext.Provider>
        {(props) => {
          const { activeTab, tabs } = props;
          const isProjectDocs = tabs[activeTab].value === PROFILES.PROJECT_DOCS;
          return (
            <Actions>
              <Actions.DownLoad
                disabled={isDownloading}
                handleDownload={() =>
                  handleDownload(
                    documentProps.url,
                    documentProps.name,
                    handleDocumentDownloadProgress,
                    {
                      onAbort: () => {},
                    }
                  )
                }
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
