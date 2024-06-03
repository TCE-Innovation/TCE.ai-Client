import React, { useState } from "react";

import { DeleteIcon } from "../../../icons";

import { DeleteConversationModal } from "../Modal";

import { useConversation, useMessage } from "../../../../hooks";

import Wrapper from "./style";

const Conversation = ({ title, id, active, setConversation }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isDeletingConversation } = useConversation();
  const { sendingMessage } = useMessage();

  const handleOpenModal = () => {
    if (isDeletingConversation || sendingMessage) return;
    setShowDeleteModal(true);
  };

  return (
    <Wrapper active={active}>
      <div className="conversation-header" onClick={() => setConversation(id)}>
        <span className="conversation-title">{title}</span>
        <div style={{ position: "relative" }}>
          {isDeletingConversation ? null : active ? (
            <span className="delete-button" onClick={handleOpenModal}>
              <DeleteIcon color="inherit" />
            </span>
          ) : null}
        </div>
      </div>
      <DeleteConversationModal
        id={id}
        onClose={() => setShowDeleteModal(false)}
        show={showDeleteModal}
        key={id}
      />
    </Wrapper>
  );
};

export default Conversation;
