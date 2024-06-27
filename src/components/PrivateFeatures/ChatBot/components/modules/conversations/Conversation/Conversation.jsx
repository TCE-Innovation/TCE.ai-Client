import React, { useState } from "react";

import { DeleteIcon, EditIcon } from "../../../icons";

import { DeleteConversationModal, EditConversationModal } from "../Modal";

import { useConversation, useMessage } from "../../../../hooks";

import Wrapper from "./style";

const Conversation = ({ title, id, active, setConversation }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isDeletingConversation, isEditingConversation } = useConversation();
  const { sendingMessage } = useMessage();

  const handleOpenDeleteModal = () => {
    if (isDeletingConversation || sendingMessage) return;
    setShowDeleteModal(true);
  };

  const handleOpenEditModal = () => {
    if (isEditingConversation) return;
    setShowEditModal(true);
  };

  return (
    <>
      <Wrapper active={active}>
        <div
          className="conversation-header"
          onClick={() => setConversation({ id, title })}
        >
          <span className="conversation-title">{title}</span>
          <div style={{ position: "relative" }}>
            {isEditingConversation ? null : active ? (
              <span
                className="edit-button tooltip-container"
                onClick={handleOpenEditModal}
              >
                <EditIcon color="inherit" />
                <div className="tooltip align-top">edit</div>
              </span>
            ) : null}
            {isDeletingConversation ? null : active ? (
              <span
                className="delete-button tooltip-container"
                onClick={handleOpenDeleteModal}
              >
                <DeleteIcon color="inherit" />
                <div className="tooltip align-top">delete</div>
              </span>
            ) : null}
          </div>
        </div>
      </Wrapper>
      <DeleteConversationModal
        id={id}
        onClose={() => setShowDeleteModal(false)}
        show={showDeleteModal}
      />
      <EditConversationModal
        conversation={{ title, id }}
        onClose={() => setShowEditModal(false)}
        show={showEditModal}
      />
    </>
  );
};

export default Conversation;
