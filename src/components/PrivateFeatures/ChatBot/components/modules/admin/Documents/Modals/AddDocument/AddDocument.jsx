import React from "react";

import { Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";

const AddNewDocument = ({ show, onClose }) => {
  const { submitHandler } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    const formdata = new FormData();
    formdata.append("file", values.document);
    formdata.append("project_id", values.projectId);
  };

  return (
    <Modal
      onCancel={onClose}
      title="Add New Document"
      buttonLabels={{
        submit: "Add Document",
      }}
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
  );
};

export default AddNewDocument;
