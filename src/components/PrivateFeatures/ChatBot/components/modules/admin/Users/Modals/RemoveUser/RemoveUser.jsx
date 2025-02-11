import React from "react";

import { Modal } from "../../../../../common";

const RemoveUser = ({ show, onClose, deleteUser, ...userProps }) => {
  const { mutate, loading: isSubmitting } = deleteUser;
  if (!show) return null;

  const handleRemoveUser = () => {
    if (isSubmitting) return;
    mutate({ userId: userProps.id });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Remove User"
      buttonLabels={{
        submit: "Remove",
      }}
      onSubmit={handleRemoveUser}
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
