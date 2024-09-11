import React from "react";

import { Modal, Loader } from "../../../../common";
import { useConversation, useMessage } from "../../../../../hooks";

const DeleteLoader = () => {
  return (
    <div style={{ pointerEvents: "none" }}>
      <Loader size={8} />
      <pre>{"    "}</pre>
    </div>
  );
};

const DeleteConversation = ({ id, show, onClose }) => {
  const { deleteConversation, isDeletingConversation } = useConversation();
  const { clearMessageCache } = useMessage();

  const handleClose = () => {
    if (isDeletingConversation) return;
    onClose();
  };

  const handleSubmit = (id) => {
    const handler = deleteConversation(id);
    return async (e) => {
      try {
        await handler(e);
        clearMessageCache(id);
      } catch (err) {
        console.error(err);
      } finally {
        onClose();
      }
    };
  };

  if (!show) return null;

  return (
    <Modal
      title={"Deleting Conversation"}
      buttonLabels={{
        submit: isDeletingConversation ? <DeleteLoader /> : "Delete",
      }}
      onSubmit={handleSubmit(id)}
      onCancel={handleClose}
      styles={{
        submit: {
          color: "var(--chatbot-red)",
          backgroundColor: "transparent",
        },
        cancel: {
          backgroundColor: "transparent",
          color: "black",
        },
      }}
    >
      Are you sure you want to delete the conversation?
    </Modal>
  );
};

export default DeleteConversation;
