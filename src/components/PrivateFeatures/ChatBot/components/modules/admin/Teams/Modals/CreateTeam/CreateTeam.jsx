import React from "react";

import { Overlay, Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";
import { mutations } from "../../../../../../hooks";

const CreateTeam = ({ show, onClose }) => {
  const { submitHandler, isValid, setError } = useContext();
  const {
    mutate: createTeam,
    loading: isSubmitting,
  } = mutations.useCreateTeam();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    if (!values.userIds.length) {
      return setError(
        "userIds",
        "Please select 1 or more users to create this team!"
      );
    }
    createTeam({ name: values.name, userIds: values.userIds });
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
        isSubmitting={isSubmitting}
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
