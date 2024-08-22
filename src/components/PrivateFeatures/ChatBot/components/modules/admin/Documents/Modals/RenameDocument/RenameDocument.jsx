import React from "react";

import { Overlay, Modal, Field } from "../../../../../common";
import { toFormData } from "../../../../../../utils/form";

import { useAdmin } from "../../../../../../hooks";

import { useContext, useFieldValue } from "../../../../../contexts/FormContext";
import { useDocument } from "../../hooks";

const RenameDocument = ({ show, onClose }) => {
  const { submitHandler, formValues } = useContext();
  const { uploadDocument } = useAdmin();
  const { value: projectId } = useFieldValue("projectId");
  const { setError } = useFieldValue("documentName");
  const { changeValue: changeFormStep } = useFieldValue("step");
  const { isDuplicateDocument, loadingDocuments } = useDocument(projectId);
  const { mutate, loading: isSubmitting } = uploadDocument;

  const handleSubmit = (values) => {
    if (isSubmitting || loadingDocuments) return;
    const isDuplicateName = isDuplicateDocument(values.documentName);
    if (isDuplicateName) {
      return setError(
        "Document with this name already exist. Please rename it."
      );
    }
    const formData = toFormData({
      doc: values.document,
      file_name: values.documentName.trim(),
    });
    mutate({ formData, projectId: values.projectId });
    changeFormStep("exit");
  };

  if (!show) return null;

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Rename Document"
        buttonLabels={{
          submit: "Rename",
        }}
        isSubmitting={isSubmitting || loadingDocuments}
        onSubmit={submitHandler(handleSubmit)}
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
        <div className="projects-modal-wrapper">
          <div>
            <Field
              name={"documentName"}
              placeholder={"Type here"}
              autoComplete="off"
              value={formValues.documentName}
            />
          </div>
        </div>
      </Modal>
    </Overlay>
  );
};

export default RenameDocument;
