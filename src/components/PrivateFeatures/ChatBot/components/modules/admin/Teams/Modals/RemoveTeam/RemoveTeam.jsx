import React from "react";

import { Overlay, Modal } from "../../../../../common";

const RemoveTeam = ({ show, onClose, deleteTeam, ...teamProps }) => {
  if (!show) return null;

  const handleRemoveTeam = () => {
    deleteTeam();
    onClose();
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Remove Team"
        buttonLabels={{
          submit: "Remove",
        }}
        onSubmit={handleRemoveTeam}
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
    </Overlay>
  );
};

export default RemoveTeam;
