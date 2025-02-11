import React from "react";

import { Modal } from "../../../../common";

const DeleteProject = ({ show, onClose, deleteProject, ...project }) => {
  const { mutate, loading: isSubmitting } = deleteProject;
  if (!show) return null;

  const handleDeleteProject = () => {
    if (isSubmitting) return;
    mutate({ projectId: project.id });
    onClose();
  };

  return (
    <Modal
      title="Deleting Project"
      buttonLabels={{
        submit: "Delete",
      }}
      isSubmitting={isSubmitting}
      onCancel={onClose}
      onSubmit={handleDeleteProject}
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
          {project.name}
        </span>
      </div>
    </Modal>
  );
};

export default DeleteProject;
