import React from "react";

import DocumentView from "./DocumentView";
import { Overlay } from "../../common";

// 65 pages
// const URL =
//   "https://chatdocstorage.blob.core.windows.net/chatbot-fulton/S48019%20-%20Vol%205%20PRDC01.06%20-%20%20EITF%20Open%20Interface%20Spec.pdf";
// const URL =
//   // 300+ pages
//   "https://chatdocstorage.blob.core.windows.net/chatbot-fulton/S48019%20Vol%205%20PRDC09%20-%20Appendix%20B%20-%20MW-1%20Manual.pdf";

const Modal = ({ pdfURL, title, ...modalProps }) => {
  if (!modalProps.show) return null;
  return (
    <Overlay>
      <DocumentView
        pdfURL={pdfURL}
        title={title}
        onClose={modalProps.onClose}
      />
    </Overlay>
  );
};

export default Modal;
