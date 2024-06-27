import React, { useEffect, useMemo, useState } from "react";

import { Overlay, Modal } from "../../../../common";
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
  }, [conversation]);

  const isValid = useMemo(() => {
    setShowValidation(false);
    return conversationName !== conversation.title;
  }, [conversationName, conversation.title]);

  const handleSubmit = async (name) => {
    setShowValidation(true);
    if (!isValid) return;
    await editConversation({ name, id: conversation.id });
    setTimeout(() => {
      onClose();
    }, 500);
  };

  if (!show) return null;

  return (
    <Overlay>
      <Modal
        title={"Edit Conversation Title"}
        buttonLabels={{
          submit: isEditingConversation ? <EditLoader /> : "Rename",
        }}
        onSubmit={() => handleSubmit(conversationName)}
        onCancel={handleClose}
        styles={{
          submit: {
            color: "var(--chatbot-primary)",
            backgroundColor: "transparent",
          },
          cancel: {
            backgroundColor: "transparent",
            color: "black",
          },
        }}
      >
        <div
          className="input-container"
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
    </Overlay>
  );
};

export default EditConversation;
