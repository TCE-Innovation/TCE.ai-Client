import React from "react";

import { Modal, Field, Loader } from "../../../../../common";

import { useAdmin } from "../../../../../../hooks";

import FormContext, {
  useFieldValue,
} from "../../../../../contexts/FormContext";
import { useDocument } from "../../hooks";

const RenameDocument = ({ show, onClose, index }) => {
  const { uploadDocument } = useAdmin();
  const { value: projectId } = useFieldValue("projectId");
  const {
    value: documentNames,
    setError,
    changeValue: changeDocumentName,
  } = useFieldValue("documentNames");
  const { isDuplicateDocument, loadingDocuments } = useDocument(projectId);
  const { loading: isSubmitting } = uploadDocument;

  const handleSubmit = () => {
    if (isSubmitting || loadingDocuments) return;
    const isDuplicateName = isDuplicateDocument(documentNames[index].name);
    const isUniqueNames =
      [...new Set(documentNames)].length === documentNames.length;
    if (isDuplicateName || !isUniqueNames) {
      return setError(
        "Document with this name already exist. Please rename it."
      );
    }
    onClose();
  };

  if (!show) return null;

  return (
    <Modal
      onCancel={onClose}
      title="Rename Document"
      buttonLabels={{
        submit: "Rename",
      }}
      isSubmitting={isSubmitting || loadingDocuments}
      onSubmit={handleSubmit}
      styles={{
        submit: {
          color: "var(--chatbot-red)",
          backgroundColor: "transparent",
        },
        cancel: {
          color: "black",
          backgroundColor: "transparent",
        },
      }}
    >
      <div className="projects-modal-wrapper position-relative">
        {loadingDocuments && <Loader />}
        <div
          style={{
            opacity: loadingDocuments ? 0 : 1,
            pointerEvents: loadingDocuments ? "none" : "all",
          }}
        >
          <FormContext initialValues={{ name: "" }}>
            <Field
              name={"name"}
              placeholder={"Type here"}
              autoComplete="off"
              onChange={(value) => {
                changeDocumentName(
                  documentNames.map((name, i) => {
                    if (i === index) {
                      return value;
                    }
                    return name;
                  })
                );
              }}
            />
          </FormContext>
        </div>
      </div>
    </Modal>
  );
};

export default RenameDocument;
