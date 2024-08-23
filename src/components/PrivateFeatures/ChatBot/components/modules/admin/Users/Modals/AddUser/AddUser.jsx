import React from "react";

import { Overlay, Modal } from "../../../../../common";

import { useAdmin } from "../../../../../../hooks";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";

const AddUser = ({ show, onClose }) => {
  const { addUser } = useAdmin();
  const { mutate, loading: isSubmitting } = addUser;
  const { submitHandler, resetForm, isValid, setError } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    const [firstName = null, lastName = null] = values.name.trim().split(/\s+/);
    if (!values.role) {
      return setError("role", "Please select a user role!");
    }
    const userData = {
      role: values.role,
      email: values.email.trim(),
      firstName,
      lastName,
    };
    mutate({ userData });
    resetForm();
    onClose();
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add New User"
        buttonLabels={{
          submit: "Add User",
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

export default AddUser;
