import React from "react";

import DocumentView from "./DocumentView";
import { Overlay } from "../../common";

const Modal = ({
  pdfURL,
  title,
  highlightedText,
  pageNumber,
  ...modalProps
}) => {
  if (!modalProps.show) return null;
  return (
    <Overlay>
      <DocumentView
        pdfURL={pdfURL}
        title={title}
        pageNumber={pageNumber}
        highlightedText={highlightedText}
        onClose={modalProps.onClose}
      />
    </Overlay>
  );
};

export default Modal;
