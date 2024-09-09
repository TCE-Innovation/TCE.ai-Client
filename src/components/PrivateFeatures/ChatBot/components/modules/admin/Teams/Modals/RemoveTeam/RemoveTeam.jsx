import React from "react";

import { Overlay, Modal } from "../../../../../common";
import { sleep } from "../../../../../../utils/misc";
import { useGlobal } from "../../../../../../hooks";

const RemoveTeam = ({ show, onClose, deleteUser, ...teamProps }) => {
  const { createAlert } = useGlobal();

  if (!show) return null;

  const handleRemoveTeam = () => {
    onClose();
    sleep(1000).then(() =>
      createAlert({
        message: `Team "${teamProps.teamName}" was removed successfully!`,
        type: "success",
      })
    );
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
