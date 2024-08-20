import React from "react";

import { Overlay, Modal, Field } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

import { getFileExtension } from "../../../../../../utils/file";

const RenameDocument = ({ show, onClose }) => {
  const { submitHandler } = useContext();

  const handleSubmit = (values) => {
    const formdata = new FormData();
    const ext = getFileExtension(values.document);
    formdata.append("file", {
      ...values.document,
      name: [values.documentName, ext].join("."),
    });
    console.log(formdata);
  };

  if (!show) return null;
  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Rename Document"
        buttonLabels={{
          submit: "Rename",
        }}
        onSubmit={submitHandler(handleSubmit)}
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
            <Field
              name={"documentName"}
              placeholder={"Type here"}
              autoComplete="off"
            />
          </div>
        </div>
      </Modal>
    </Overlay>
  );
};

export default RenameDocument;
