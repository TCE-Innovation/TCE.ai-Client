import React from "react";

import { Overlay, Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";

const CreateTeam = ({ show, onClose }) => {
  const { submitHandler, isValid } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    console.log({ values });
    onClose();
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Create New Team"
        buttonLabels={{
          submit: "Create Team",
        }}
        isDisabled={!isValid}
        onSubmit={submitHandler(handleSubmit)}
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
          <Form />
        </div>
      </Modal>
    </Overlay>
  );
};

export default CreateTeam;
