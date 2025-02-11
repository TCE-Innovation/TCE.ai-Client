import React from "react";

import { Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

const RemoveUser = ({ show, onClose, removeUserFromProject, ...userProps }) => {
  const { mutate, loading: isSubmitting } = removeUserFromProject;
  const { submitHandler } = useContext();

  if (!show) return null;

  const handleRemoveUser = (values) => {
    if (isSubmitting) return;
    mutate({ projectId: values.projectId, userId: userProps.id });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Remove User from this Project"
      buttonLabels={{
        submit: "Remove",
      }}
      onSubmit={submitHandler(handleRemoveUser)}
      isSubmitting={isSubmitting}
      styles={{
        submit: {
          color: "var(--chatbot-red)",
          backgroundColor: "transparent",
        },
        cancel: {
          color: "black",
          backgroundColor: "transparent",
        },
      }}
    >
      <div className="projects-modal-wrapper">
        <div>
          Are you sure you want to remove this user from project? This action
          cannot be undone.
        </div>
        <br />
        {userProps.name && (
          <div>
            User Name:{" "}
            <span style={{ color: "var(--chatbot-text-primary)" }}>
              {userProps.name}
            </span>
          </div>
        )}
        <div>
          Email:{" "}
          <span style={{ color: "var(--chatbot-text-primary)" }}>
            {userProps.email}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveUser;
