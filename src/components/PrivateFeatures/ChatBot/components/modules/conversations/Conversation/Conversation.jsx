import React, { useLayoutEffect, useRef, useState } from "react";

import { DeleteIcon, EditIcon } from "../../../icons";

import { DeleteConversationModal, EditConversationModal } from "../Modal";

import { useConversation, useMessage, useScroll } from "../../../../hooks";

import Wrapper from "./style";

const Conversation = ({
  setConversation,
  renderActions,
  ...conversationProps
}) => {
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const { isDeletingConversation, isEditingConversation } = useConversation();
  // const { sendingMessage } = useMessage();
  const { containerRef, scrollIntoView } = useScroll();

  // const handleOpenDeleteModal = () => {
  //   if (isDeletingConversation || sendingMessage) return;
  //   setShowDeleteModal(true);
  // };

  // const handleOpenEditModal = () => {
  //   if (isEditingConversation) return;
  //   setShowEditModal(true);
  // };

  const mountRef = useRef(false);
  const { title, active, id } = conversationProps;

  useLayoutEffect(() => {
    if (mountRef.current) return;
    if (active) {
      scrollIntoView();
    }
    mountRef.current = true;
  }, [scrollIntoView, active]);

  return (
    <>
      <Wrapper active={active}>
        <div
          className="conversation-header"
          ref={containerRef}
          onClick={() => setConversation({ id, title })}
        >
          <span className="conversation-title">{title}</span>
          {renderActions?.({ ...conversationProps })}
          {/* <div className="conversation-tools">
            {isEditingConversation ? null : active ? (
              <span
                className="edit-button tooltip-container"
                onClick={handleOpenEditModal}
              >
                <EditIcon color="inherit" />
                <div className="tooltip align-bottom">edit</div>
              </span>
            ) : null}
            {isDeletingConversation ? null : active ? (
              <span
                className="delete-button tooltip-container"
                onClick={handleOpenDeleteModal}
              >
                <DeleteIcon color="inherit" />
                <div className="tooltip align-bottom">delete</div>
              </span>
            ) : null}
          </div> */}
        </div>
      </Wrapper>
      {/* <DeleteConversationModal
        id={id}
        onClose={() => setShowDeleteModal(false)}
        show={showDeleteModal}
      />
      <EditConversationModal
        conversation={{ title, id }}
        onClose={() => setShowEditModal(false)}
        show={showEditModal}
      /> */}
    </>
  );
};

export default Conversation;
