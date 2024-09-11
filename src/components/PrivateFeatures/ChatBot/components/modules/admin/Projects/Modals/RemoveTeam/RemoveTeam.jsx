import React from "react";

import { Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";

const RemoveTeam = ({ show, onClose, ...teamProps }) => {
  const { submitHandler } = useContext();
  const { createAlert } = useGlobal();
  if (!show) return null;

  const handleRemoveTeam = (values) => {
    onClose();
    createAlert({
      message: `Team "${
        values.name
      }" was removed from the project successfully`,
      type: "success",
    });
  };

  return (
    <Modal
      onCancel={onClose}
      title="Remove Team from Project"
      buttonLabels={{
        submit: "Remove",
      }}
      onSubmit={submitHandler(handleRemoveTeam)}
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
        todo: remove team from project
      </div>
    </Modal>
  );
};

export default RemoveTeam;
