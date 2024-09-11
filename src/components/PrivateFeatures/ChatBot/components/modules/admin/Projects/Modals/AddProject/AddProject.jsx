import React from "react";

import { Modal, Field } from "../../../../../common";
import { useContext } from "../../../../../contexts/FormContext";
import { useAdmin } from "../../../../../../hooks";

const AddProject = ({ show, onClose }) => {
  const { submitHandler, isValid } = useContext();
  const { createProject } = useAdmin();
  const { mutate, loading: isSubmitting } = createProject;

  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting || !isValid) return;
    mutate({ name: values.name.trim() });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Add New Project"
      buttonLabels={{
        submit: "Add Project",
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
        <Field name={"name"} placeholder={"Type here"} label="Name" min={5} />
      </div>
    </Modal>
  );
};

export default AddProject;
