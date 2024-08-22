import React from "react";

import { Overlay, Modal, Field } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

const EditProject = ({ show, onClose, editProject, ...project }) => {
  const { mutate, loading: isSubmitting } = editProject;
  const { submitHandler } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    mutate({ projectName: values.name.trim(), projectId: project.id });
    onClose();
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Edit Project Name"
        buttonLabels={{
          submit: "Save",
        }}
        onSubmit={submitHandler(handleSubmit)}
        isSubmitting={isSubmitting}
        styles={{
          submit: {
            color: "white",
            backgroundColor: "var(--chatbot-primary) important!",
          },
          cancel: {
            color: "black",
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="projects-modal-wrapper">
          <Field name={"name"} placeholder={"Project name"} label="Name" />
        </div>
      </Modal>
    </Overlay>
  );
};

export default EditProject;
