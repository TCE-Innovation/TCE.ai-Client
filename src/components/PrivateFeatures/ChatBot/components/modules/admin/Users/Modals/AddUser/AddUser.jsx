import React from "react";

import { Overlay, Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import Form from "./Form";

const AddUser = ({ show, onClose }) => {
  const { submitHandler } = useContext();
  if (!show) return null;

  const handleSubmit = (values) => {
    console.log({ values });
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add New User"
        buttonLabels={{
          submit: "Add User",
        }}
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
