import React from "react";

import DocumentView from "./DocumentView";
import { Overlay } from "../../common";

const Modal = (modalProps) => {
  if (!modalProps.show) return null;
  return (
    <Overlay>
      <DocumentView onClose={modalProps.onClose} />
    </Overlay>
  );
};

export default Modal;
