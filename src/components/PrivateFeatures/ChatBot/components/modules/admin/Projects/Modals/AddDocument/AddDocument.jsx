import React, { useMemo, useState } from "react";

import { Overlay, Modal } from "../../../../../common";

import { useContext, useFieldValue } from "../../../../../contexts/FormContext";

import { RenameDocumentAlert } from "../../../Documents/Modals/DocumentAlert";

import { getFileExtension } from "../../../../../../utils/file";

import Form from "./Form";

const AddDocument = ({ show, onClose }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { submitHandler } = useContext();
  const { value: currentDocument } = useFieldValue("document");

  const documentDescription = useMemo(() => {
    const ext = getFileExtension(currentDocument);
    return {
      name: currentDocument?.name || "<INVALID>",
      documentType: ext || "<INVALID>",
      size: currentDocument?.size || 0,
      uploadDate: new Date().toISOString(),
    };
  }, [currentDocument]);

  const isDuplicateDocument = (doc) => {
    // hardcode to true
    return true;
  };

  const handleSubmit = (values) => {
    const _isDuplicate = isDuplicateDocument(values.document);
    if (_isDuplicate) {
      return setIsDuplicate(true);
    }
    const formdata = new FormData();
    formdata.append("file", values.document);
    console.log(formdata);
  };

  if (!show) return null;

  if (isDuplicate)
    return (
      <RenameDocumentAlert
        show={true}
        onClose={() => setIsDuplicate(false)}
        {...documentDescription}
      />
    );

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add Document to Project Name"
        buttonLabels={{
          submit: "Add Document",
        }}
        onSubmit={submitHandler(handleSubmit)}
        styles={{
          submit: {
            color: "white",
            backgroundColor: "var(--chatbot-primary)",
          },
          cancel: {
            color: "black",
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="projects-modal-wrapper">
          <Form />
        </div>
      </Modal>
    </Overlay>
  );
};

export default AddDocument;
