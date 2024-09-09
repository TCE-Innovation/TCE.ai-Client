import React from "react";

import { Overlay, Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";
import { sleep } from "../../../../../../utils/misc";
import { useGlobal } from "../../../../../../hooks";

const CreateTeam = ({ show, onClose }) => {
  const { submitHandler, isValid } = useContext();
  const { createAlert } = useGlobal();
  if (!show) return null;

  const handleSubmit = (values) => {
    onClose();
    sleep(1000).then(() =>
      createAlert({
        message: `Team "${values.name}" was created successfully!`,
        type: "success",
      })
    );
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
