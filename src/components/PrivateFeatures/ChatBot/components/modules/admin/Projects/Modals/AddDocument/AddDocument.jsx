import React, { useEffect, useMemo } from "react";

import { Overlay, Modal } from "../../../../../common";

import { useAdmin, queries } from "../../../../../../hooks";

import { useContext, useFieldValue } from "../../../../../contexts/FormContext";

import { RenameDocumentAlert } from "../../../Documents/Modals/DocumentAlert";

import { getFileExtension, getFileName } from "../../../../../../utils/file";
import { toFormData } from "../../../../../../utils/form";
import { useDocument } from "../../../Documents/hooks";

import Form from "./Form";
import { RenameDocumentModal } from "../../../Documents/Modals";

const { useGetProjectsQuery } = queries;

const AddDocument = ({ show, onClose }) => {
  const { uploadDocument } = useAdmin();
  const { value: projectId } = useFieldValue("projectId");
  const { isDuplicateDocument, loadingDocuments } = useDocument(projectId);
  const { data: projects } = useGetProjectsQuery({
    disableRunOnMount: projectId === null,
  });
  const { mutate, loading: isSubmitting } = uploadDocument;

  const project = useMemo(() => {
    if (!projects) return null;
    return projects.data.find(
      (project) => project.id.toString() === projectId.toString()
    );
  }, [projects, projectId]);

  const { submitHandler, resetForm } = useContext();
  const { value: currentDocument } = useFieldValue("document");
  const { value: formStep, changeValue: changeFormStep } = useFieldValue(
    "step"
  );

  useEffect(() => {
    if (formStep === "exit") {
      resetForm();
      onClose();
    }
    // eslint-disable-next-line
  }, [formStep]);

  useEffect(() => {
    changeFormStep("upload");
    // eslint-disable-next-line
  }, []);

  const documentDescription = useMemo(() => {
    const ext = getFileExtension(currentDocument);
    return {
      name: currentDocument?.name || "<INVALID>",
      documentType: ext || "<INVALID>",
      size: currentDocument?.size || 0,
      uploadDate: new Date().toISOString(),
    };
  }, [currentDocument]);

  const handleSubmit = (values) => {
    if (loadingDocuments || isSubmitting) return;
    const fileName = getFileName(values.documentName);
    const _isDuplicate = isDuplicateDocument(values.documentName);
    if (_isDuplicate) {
      return changeFormStep("alert");
    }
    const formData = toFormData({
      doc: values.document,
      file_name: fileName,
    });
    mutate({ formData, projectId });
    resetForm();
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
      <Overlay>
        <Modal
          onCancel={onClose}
          title={`Add Document to Project ${
            project?.name ? `"${project.name}"` : ""
          }`}
          buttonLabels={{
            submit: "Add Document",
          }}
          isSubmitting={isSubmitting || loadingDocuments}
          onSubmit={submitHandler(handleSubmit)}
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
          <div className="projects-modal-wrapper">
            <Form />
          </div>
        </Modal>
      </Overlay>
    );
  }
  if (formStep === "rename") {
    return (
      <RenameDocumentModal
        show={true}
        onClose={() => changeFormStep("alert")}
      />
    );
  }
};

export default AddDocument;
