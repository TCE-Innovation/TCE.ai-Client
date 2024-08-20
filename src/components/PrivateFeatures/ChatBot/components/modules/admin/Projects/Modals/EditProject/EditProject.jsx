import React from "react";

import { Overlay, Modal, Field } from "../../../../../common";
import { useEditProject } from "../../../../../../hooks/useQueries";

import { useContext } from "../../../../../contexts/FormContext";

const EditProject = ({ show, onClose }) => {
  const { mutate, loading: isSubmitting } = useEditProject();
  const { submitHandler } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    console.log({ values });
    mutate({ projectName: values.name, projectId: values.projectId });
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
