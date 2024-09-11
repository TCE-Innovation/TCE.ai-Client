import React from "react";

import { Modal } from "../../../../../common";
import Description from "../../Forms/_Description";

const RemoveDocument = ({ show, onClose, ...document }) => {
  if (!show) return null;

  return (
    <Modal
      onCancel={onClose}
      title="Remove Document"
      buttonLabels={{
        submit: "Remove",
      }}
      onSubmit={() => console.log("remove document")}
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
          Are you sure you want to remove this document?
          <br />
          This action cannot be undone.
        </div>
        <br />
        <Description {...document} />
      </div>
    </Modal>
  );
};

export default RemoveDocument;
