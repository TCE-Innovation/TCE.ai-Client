import React from "react";

import { Overlay, Modal } from "../../../../../common";
import { useDeleteUserQuery } from "../../../../../../hooks/useQueries";

const RemoveUser = ({ show, onClose, username, email, id }) => {
  const { mutate, loading: isSubmitting } = useDeleteUserQuery();
  if (!show) return null;

  const handleRemoveUser = () => {
    if (isSubmitting) return;
    mutate(id);
  };

  return (
    <Overlay>
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
          <div>
            User Name:{" "}
            <span style={{ color: "var(--chatbot-text-primary)" }}>
              {username}
            </span>
          </div>
          <div>
            Email:{" "}
            <span style={{ color: "var(--chatbot-text-primary)" }}>
              {email}
            </span>
          </div>
        </div>
      </Modal>
    </Overlay>
  );
};

export default RemoveUser;
