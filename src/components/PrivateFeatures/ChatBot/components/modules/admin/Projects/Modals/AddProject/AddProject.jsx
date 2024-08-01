import React from "react";

import { Overlay, Modal, Field } from "../../../../../common";
import { useContext } from "../../../../../contexts/FormContext";

const AddProject = ({ show, onClose }) => {
  const { submitHandler } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    console.log({ values });
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add New Project"
        buttonLabels={{
          submit: "Add Project",
        }}
        onSubmit={submitHandler(handleSubmit)}
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
          <Field name={"name"} placeholder={"Type here"} label="Name" />
        </div>
      </Modal>
    </Overlay>
  );
};

export default AddProject;
