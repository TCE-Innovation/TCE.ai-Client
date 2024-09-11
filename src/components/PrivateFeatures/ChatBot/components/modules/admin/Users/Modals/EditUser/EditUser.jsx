import React from "react";

import { Modal } from "../../../../../common";

import RolesField from "../../Forms/_Role";

import { useContext } from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";

import { sleep } from "../../../../../../utils/misc";

const EditUser = ({ show, onClose, ...userProps }) => {
  const { submitHandler, isValid, setError } = useContext();
  const { createAlert } = useGlobal();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (!values.role) {
      return setError("role", "Please select a user role!");
    }
    if (values.role === userProps.role) {
      return setError(
        "role",
        "User already has this role. Please select a different role!"
      );
    }
    const userData = {
      role: values.role,
    };
    console.log({ userData });
    onClose();
    sleep(1000).then(() =>
      createAlert(
        { message: "user role changed successfully!" },
        { type: "success" }
      )
    );
  };

  return (
    <Modal
      onCancel={onClose}
      title="Edit User Role"
      buttonLabels={{
        submit: "Save",
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
        <RolesField name={"role"} initialValue={userProps.role} />
      </div>
    </Modal>
  );
};

export default EditUser;
