import React from "react";

import { Overlay, Modal } from "../../../../../common";

const AddUserToTeam = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add User To Team"
        buttonLabels={{
          submit: "Add User",
        }}
        onSubmit={() => console.log("todo: add user to team")}
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
        <div className="projects-modal-wrapper">todo: add user to team</div>
      </Modal>
    </Overlay>
  );
};

export default AddUserToTeam;
