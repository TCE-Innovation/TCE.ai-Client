import React from "react";

import { Overlay, Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";

const AddTeam = ({ show, onClose }) => {
  const { submitHandler } = useContext();
  const { createAlert } = useGlobal();
  if (!show) return null;

  const handleAddTeam = (values) => {
    onClose();
    createAlert({
      message: `Team "${values.teams}" was added to the project successfully`,
      type: "success",
    });
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add Teams to Project"
        buttonLabels={{
          submit: "Add Team",
        }}
        onSubmit={submitHandler(handleAddTeam)}
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
        <div className="projects-modal-wrapper">todo: add team to project</div>
      </Modal>
    </Overlay>
  );
};

export default AddTeam;
