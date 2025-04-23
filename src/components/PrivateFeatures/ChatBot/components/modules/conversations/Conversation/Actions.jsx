import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "../../../icons";
import useConversation from "../../../../hooks/useConversation";
import { DeleteConversationModal, EditConversationModal } from "../Modal";

const Actions = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isDeletingConversation, isEditingConversation } = useConversation();

  const handleOpenDeleteModal = () => {
    if (isDeletingConversation) return;
    setShowDeleteModal(true);
  };

  const handleOpenEditModal = () => {
    if (isEditingConversation) return;
    setShowEditModal(true);
  };

  return (
    <>
      <div className="conversation-tools">
        {isEditingConversation ? null : props.active ? (
          <span
            className="edit-button tooltip-container"
            onClick={handleOpenEditModal}
          >
            <EditIcon color="inherit" />
            <div className="tooltip align-bottom">edit</div>
          </span>
        ) : null}
        {isDeletingConversation ? null : props.active ? (
          <span
            className="delete-button tooltip-container"
            onClick={handleOpenDeleteModal}
          >
            <DeleteIcon color="inherit" />
            <div className="tooltip align-bottom">delete</div>
          </span>
        ) : null}
      </div>
      <DeleteConversationModal
        id={props.id}
        onClose={() => setShowDeleteModal(false)}
        show={showDeleteModal}
      />
      <EditConversationModal
        conversation={{ title: props.title, id: props.id }}
        onClose={() => setShowEditModal(false)}
        show={showEditModal}
      />
    </>
  );
};

export default Actions;
