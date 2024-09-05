import React from "react";

import { Overlay, Modal } from "../../../../../common";

const RemoveTeamUser = ({ show, onClose, ...teamProps }) => {
  if (!show) return null;

  const handleRemoveTeam = () => {
    console.log("removing team user");
    onClose();
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Remove Team Uer"
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
        <div className="projects-modal-wrapper">todo</div>
      </Modal>
    </Overlay>
  );
};

export default RemoveTeamUser;
