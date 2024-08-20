import React from "react";

import { Overlay, Modal } from "../../../../../common";

import { useAddUser } from "../../../../../../hooks/useQueries";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";
import { getRoleById } from "../../../../../../utils/data";

const AddUser = ({ show, onClose }) => {
  const { mutate, loading: isSubmitting } = useAddUser();
  const { submitHandler } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    const [first_name = null, last_name = null] = values.name
      .trim()
      .split(/\s+/);
    const submitValues = {
      role: getRoleById(values.role),
      email: values.email,
      first_name,
      last_name,
    };
    mutate(submitValues);
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add New User"
        buttonLabels={{
          submit: "Add User",
        }}
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
