import React from "react";

import { Modal } from "../../../../../common";

import RolesField from "../../Forms/_Role";

import { useContext } from "../../../../../contexts/FormContext";

const EditUser = ({ show, onClose, editUser, ...userProps }) => {
  const { mutate: handleEditUser, loading: isSubmitting } = editUser;
  const { submitHandler, isValid, setError } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    if (!values.role) {
      return setError("role", "Please select a user role!");
    }
    if (values.role === userProps.role) {
      return setError(
        "role",
        "User already has this role. Please select a different role!"
      );
    }
    handleEditUser({ role: values.role, userId: userProps.id });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Edit User Role"
      buttonLabels={{
        submit: "Save",
      }}
      isSubmitting={isSubmitting}
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
