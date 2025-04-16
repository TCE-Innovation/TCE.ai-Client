import React, { useMemo } from "react";

import useUpload from "./useUpload";

import { useContext } from "../../../../../contexts/FormContext";

import { RenameDocumentAlert } from "../../../Documents/Modals/DocumentAlert";
import { Loader, Modal } from "../../../../../common";
import ErrorBlock from "../../../../../common/field/ErrorBlock";
import { getFileExtension } from "../../../../../../utils/file";

import UploadFiles from "../../../Documents/Forms/_UploadFiles";
import UploadDirectory from "../../../Documents/Forms/_UploadDirectory";
import { RenameDocumentModal } from "../../../Documents/Modals";

const uploadDirectoryElement = (
  <UploadDirectory
    name={"directory"}
    title="Upload Document Folder"
    id="upload-directory"
  />
);
const uploadFilesElement = (
  <UploadFiles
    name={"documents"}
    title="Upload Documents"
    id="upload-documents"
  />
);

const AddDocument = ({ show, onClose }) => {
  const {
    formStep,
    changeFormStep,
    handleSubmit,
    docIndex,
    project,
    files,
    error,
    isSubmitting,
    isloading,
  } = useUpload({ name: "documents" });

  const { submitHandler } = useContext();

  const documentDescription = useMemo(() => {
    const doc = files?.[docIndex];
    const ext = getFileExtension(doc);
    return {
      name: doc?.name || "<INVALID>",
      documentType: ext || "<INVALID>",
      size: doc?.size || 0,
      uploadDate: new Date().toISOString(),
    };
  }, [docIndex, files]);

  const onSubmit = (values) => {
    const success = handleSubmit(values);
    if (!success) return;
    onClose();
  };

  if (!show) return null;

  if (formStep === "alert")
    return (
      <RenameDocumentAlert
        show={true}
        onClose={() => {}}
        {...documentDescription}
      />
    );

  if (formStep === "upload") {
    return (
      <Modal
        onCancel={onClose}
        title={`Add Document to Project ${
          project?.name ? `"${project.name}"` : ""
        }`}
        buttonLabels={{
          submit: "Add Document",
        }}
        isDisabled={error !== null}
        isSubmitting={isSubmitting || isloading}
        onSubmit={submitHandler(onSubmit)}
        styles={{
          submit: {
            color: "white",
            backgroundColor: "var(--chatbot-primary)",
          },
          cancel: {
            color: "black",
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="projects-modal-wrapper position-relative">
          <ErrorBlock name={"documents"} />
          {isloading && <Loader />}
          <div
            style={{
              opacity: isloading ? 0 : 1,
              pointerEvents: isloading ? "none" : "all",
            }}
          >
            <div className="d-flex flex-column gap-2">
              {uploadDirectoryElement}

              {uploadFilesElement}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  if (formStep === "rename") {
    return (
      <RenameDocumentModal
        show={true}
        index={docIndex}
        onClose={() => changeFormStep("upload")}
      />
    );
  }
};

export default AddDocument;
