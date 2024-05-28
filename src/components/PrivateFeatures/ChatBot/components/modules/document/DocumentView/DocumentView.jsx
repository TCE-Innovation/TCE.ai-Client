import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";

import DocumentHeader from "./DocumentHeader";
import RenderLoader from "./RenderLoader";

import { useDocument } from "../../../../hooks";

import "@react-pdf-viewer/core/lib/styles/index.css";

import Wrapper from "./style";

// const URL = "https://pdfobject.com/pdf/sample.pdf";

// 65 pages
const URL =
  "https://chatdocstorage.blob.core.windows.net/chatbot-fulton/S48019%20-%20Vol%205%20PRDC01.06%20-%20%20EITF%20Open%20Interface%20Spec.pdf";
// const URL =
//   // 300+ pages
//   "https://chatdocstorage.blob.core.windows.net/chatbot-fulton/S48019%20Vol%205%20PRDC09%20-%20Appendix%20B%20-%20MW-1%20Manual.pdf";

const DocumentView = ({ onClose }) => {
  const { plugins, pageControl, workerUrl, handleDocumentLoad } = useDocument([
    "approved",
  ]);

  return (
    <Wrapper>
      <div className="document-container">
        <DocumentHeader
          title={URL}
          currentPage={pageControl.CurrentPageLabel}
          jumpToNextPage={pageControl.jumpToNextPage}
          jumpToPreviousPage={pageControl.jumpToPreviousPage}
          totalPage={pageControl.NumberOfPages}
          onClose={onClose}
        />
        <div className="document-body">
          <Worker workerUrl={workerUrl}>
            <Viewer
              renderLoader={(percentage) => (
                <RenderLoader progress={percentage} />
              )}
              fileUrl={URL}
              plugins={plugins}
              defaultScale={0.7790375}
              initialPage={1}
              onDocumentLoad={handleDocumentLoad}
            />
          </Worker>
        </div>
      </div>
    </Wrapper>
  );
};

export default DocumentView;
