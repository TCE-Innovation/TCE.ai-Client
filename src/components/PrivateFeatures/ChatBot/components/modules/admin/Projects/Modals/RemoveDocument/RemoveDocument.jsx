import React from "react";

import { Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import Description from "../../../Documents/Forms/_Description";

const RemoveDocument = ({ show, onClose, deleteDocument, ...document }) => {
  const { mutate, loading: isSubmitting } = deleteDocument;
  const { submitHandler } = useContext();
  if (!show) return null;

  const handleRemoveDocument = (values) => {
    if (isSubmitting) return;
    mutate({ documentId: document.id, projectId: values.projectId });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Remove Document from Project"
      buttonLabels={{
        submit: "Remove",
      }}
      isSubmitting={isSubmitting}
      onSubmit={submitHandler(handleRemoveDocument)}
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
          Are you sure you want to remove this document?
          <br />
          This action cannot be undone.
        </div>
        <br />
        <Description {...document} />
      </div>
    </Modal>
  );
};

export default RemoveDocument;
