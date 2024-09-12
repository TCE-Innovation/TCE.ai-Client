import React from "react";

import { Modal } from "../../../../../common";

const RemoveTeam = ({ show, onClose, deleteTeam, ...teamProps }) => {
  const { mutate: handleDeleteTeam, loading: isSubmitting } = deleteTeam;
  if (!show) return null;

  const onSubmit = () => {
    if (isSubmitting) return;
    handleDeleteTeam({ teamId: teamProps.id });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Remove Team"
      buttonLabels={{
        submit: "Remove",
      }}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
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
        <div>Are you sure you want to remove this team?</div>
        <br />
        <div>
          Team Name:{" "}
          <span style={{ color: "var(--chatbot-text-primary)" }}>
            {teamProps.teamName}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveTeam;
