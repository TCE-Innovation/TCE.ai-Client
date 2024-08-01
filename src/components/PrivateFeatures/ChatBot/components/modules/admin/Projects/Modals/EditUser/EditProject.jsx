import React from "react";

import { Overlay, Modal, Field } from "../../../../../common";

const EditProject = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Edit Project Name"
        buttonLabels={{
          submit: "Save",
        }}
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
