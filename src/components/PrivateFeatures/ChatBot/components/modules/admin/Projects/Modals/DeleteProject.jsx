import React from "react";

import { Overlay, Modal } from "../../../../common";

const DeleteProject = ({ show, onClose, projectName }) => {
  if (!show) return null;

  return (
    <Overlay>
      <Modal
        title="Deleting Project"
        buttonLabels={{
          submit: "Delete",
        }}
        onCancel={onClose}
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
        <div className="pb-2">Are you sure you want to delete the project?</div>
        <div>
          Project Name:{" "}
          <span style={{ color: "var(--chatbot-text-primary)" }}>
            {projectName}
          </span>
        </div>
      </Modal>
    </Overlay>
  );
};

export default DeleteProject;
