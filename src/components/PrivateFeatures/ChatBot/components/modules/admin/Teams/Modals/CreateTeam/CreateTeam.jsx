import React from "react";

import { Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";
import { useAdmin } from "../../../../../../hooks";

const CreateTeam = ({ show, onClose }) => {
  const { submitHandler, isValid, setError } = useContext();
  const { createTeamObject } = useAdmin();

  const { mutate: createTeam, loading: isSubmitting } = createTeamObject;
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
  );
};

export default CreateTeam;
