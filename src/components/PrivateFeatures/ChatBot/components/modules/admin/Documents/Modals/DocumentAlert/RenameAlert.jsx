import React from "react";

import { useContext, useFieldValue } from "../../../../../contexts/FormContext";

import { Overlay, Modal } from "../../../../../common";
import Description from "../../Forms/_Description";

const RenameAlert = ({ show, onClose, ...document }) => {
  const { resetForm } = useContext();
  const { changeValue: changeFormStep } = useFieldValue("step");
  if (!show) return null;

  const handleRenameDocument = () => {
    changeFormStep("rename");
  };

  const handleReplaceDocument = () => {
    changeFormStep("upload");
    resetForm("document", "documentName");
    onClose();
  };

  return (
    <Overlay>
      <Modal
        onCancel={handleReplaceDocument}
        title="Document with the same name already exists"
        buttonLabels={{
          submit: "Rename New Document",
          cancel: "Replace it",
        }}
        showCloseBtn
        onSubmit={handleRenameDocument}
        styles={{
          submit: {
            color: "black",
            border: "1px solid var(--chatbot-primary)",
            backgroundColor: "white",
          },
          cancel: {
            color: "black",
            border: "1px solid var(--chatbot-primary)",
            backgroundColor: "white",
          },
        }}
      >
        <div className="projects-modal-wrapper">
          <Description {...document} />
          <br />
          <div>
            Please rename the document to avoid duplication or replace it
          </div>
        </div>
      </Modal>
    </Overlay>
  );
};

export default RenameAlert;
