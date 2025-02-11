import React from "react";

import { Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";
import { useAdmin } from "../../../../../../hooks";

import Form from "./Form";

const AddTeam = ({ show, onClose }) => {
  const { addTeamsToProjectObject } = useAdmin();
  const {
    mutate: handleAddTeam,
    loading: isSubmitting,
  } = addTeamsToProjectObject;
  const { submitHandler, isValid, setError } = useContext();
  if (!show) return null;

  const onSubmit = (values) => {
    if (isSubmitting) return;
    if (!values.teamDetails.length) {
      return setError(
        "teams",
        "Please Select at least 1 team to add to this project!"
      );
    }
    handleAddTeam({
      projectId: values.projectId,
      teamDetails: values.teamDetails,
    });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Add Teams to Project"
      buttonLabels={{
        submit: "Add Team",
      }}
      isSubmitting={isSubmitting}
      isDisabled={!isValid}
      onSubmit={submitHandler(onSubmit)}
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

export default AddTeam;
