import React from "react";

import DocumentView from "./DocumentView";

const Modal = ({
  pdfURL,
  title,
  highlightedText,
  pageNumber,
  ...modalProps
}) => {
  if (!modalProps.show) return null;
  return (
    <DocumentView
      pdfURL={pdfURL}
      title={title}
      pageNumber={pageNumber}
      highlightedText={highlightedText}
      onClose={modalProps.onClose}
    />
  );
};

export default Modal;
