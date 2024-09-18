import React from "react";

import DocumentView from "./DocumentView";
import Portal from "../../common/Portal";

const Modal = ({
  pdfURL,
  title,
  highlightedText,
  pageNumber,
  ...modalProps
}) => {
  if (!modalProps.show) return null;
  return (
    <Portal>
      <DocumentView
        pdfURL={pdfURL}
        title={title}
        pageNumber={pageNumber}
        highlightedText={highlightedText}
        onClose={modalProps.onClose}
      />
    </Portal>
  );
};

export default Modal;
