import React, { useEffect, useMemo, useState } from "react";

import { Modal } from "../../../../common";
import { useConversation } from "../../../../../hooks";

import EditLoader from "./Loader";

const EditConversation = ({ conversation, show, onClose }) => {
  const [conversationName, setConversationName] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const { editConversation, isEditingConversation } = useConversation();

  const handleClose = () => {
    if (isEditingConversation) return;
    onClose();
  };

  useEffect(() => {
    if (!conversation?.id) return;
    setConversationName(conversation.title);
  }, [conversation?.id, conversation?.title]);

  const isValid = useMemo(() => {
    setShowValidation(false);
    return conversationName !== conversation.title;
  }, [conversationName, conversation.title]);

  const handleSubmit = async (name) => {
    setShowValidation(true);
    if (!isValid) return;
    await editConversation({ name, id: conversation.id });
    onClose();
  };

  if (!show) return null;

  return (
    <Modal
      title={"Edit Conversation Title"}
      buttonLabels={{
        submit: (
          <div className="d-flex justify-content-center align-items-center gap-1">
            <span>Save</span>
            {isEditingConversation && (
              <span className="position-relative" style={{ width: "2em" }}>
                <EditLoader color="white" />
              </span>
            )}
          </div>
        ),
      }}
      onSubmit={() => handleSubmit(conversationName)}
      onCancel={handleClose}
      styles={{
        submit: {
          color: isEditingConversation ? "var(--chatbot-grey)" : "white",
          backgroundColor: `${
            isEditingConversation
              ? "var(--chatbot-light-grey)"
              : "var(--chatbot-primary)"
          }`,
        },
        cancel: {
          backgroundColor: "transparent",
          color: "black",
        },
      }}
    >
      <div
        className="chatbot-input-container"
        style={{ width: "clamp(300px,30vw,400px)" }}
      >
        {showValidation && !isValid && (
          <div style={{ color: "var(--chatbot-red)" }}>
            Please enter a different conversation title
          </div>
        )}
        <input
          placeholder={conversation.title}
          value={conversationName}
          style={{ width: "100%" }}
          onChange={(e) => setConversationName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default EditConversation;
