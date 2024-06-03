import React from "react";

import { Overlay, Modal, Loader } from "../../../../common";
import { useConversation } from "../../../../../hooks";

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

  const handleClose = () => {
    if (isDeletingConversation) return;
    onClose();
  };

  const handleSubmit = (id) => {
    const handler = deleteConversation(id);
    return (e) => {
      handler(e);
      setTimeout(() => {
        onClose();
      }, 500);
    };
  };

  if (!show) return null;

  return (
    <Overlay>
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
    </Overlay>
  );
};

export default DeleteConversation;
