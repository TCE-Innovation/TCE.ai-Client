import React from "react";

import { Modal, Field } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

const EditProject = ({ show, onClose, editProject, ...project }) => {
  const { mutate, loading: isSubmitting } = editProject;
  const { submitHandler, isValid, setError } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    if (values.name.trim() === project.name.trim()) {
      return setError("name", "New project name cannot be same as before!");
    }
    mutate({ projectName: values.name.trim(), projectId: project.id });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Edit Project Name"
      buttonLabels={{
        submit: "Save",
      }}
      isDisabled={!isValid}
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
        <Field
          name={"name"}
          placeholder={"Project name"}
          label="Name"
          min={5}
        />
      </div>
    </Modal>
  );
};

export default EditProject;
