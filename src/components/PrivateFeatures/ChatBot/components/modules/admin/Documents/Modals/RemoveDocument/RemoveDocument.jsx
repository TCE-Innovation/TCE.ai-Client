import React from "react";

import { Overlay, Modal } from "../../../../../common";

const RemoveDocument = ({ show, onClose, ...document }) => {
  if (!show) return null;

  return (
    <Overlay>
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
          <div>
            Document Name:{" "}
            <span style={{ color: "var(--chatbot-text-primary)" }}>
              {document.name}
            </span>
          </div>
          <div>
            Document Type:{" "}
            <span style={{ color: "var(--chatbot-text-primary)" }}>
              {document.documentType}
            </span>
          </div>
          <div>
            Size:{" "}
            <span style={{ color: "var(--chatbot-text-primary)" }}>
              {document.size}
            </span>
          </div>
          <div>
            Date and Time of Addition:{" "}
            <span style={{ color: "var(--chatbot-text-primary)" }}>
              {document.uploadDate}
            </span>
          </div>
        </div>
      </Modal>
    </Overlay>
  );
};

export default RemoveDocument;
