import React, { useState } from "react";

import DocumentModal from "../../../document/Modal";

import { DocumentIcon } from "../../../../icons";

import Wrapper from "./style";

const Citation = ({ highlightedText, pageNumber, url, title }) => {
  const [show, setShow] = useState(false);
  return (
    <Wrapper>
      <div className="citation-line">
        <div>{title} -</div>
        <div>Page {pageNumber} -</div>
        <div>
          <button
            className="chat-button document-open-btn tooltip-container"
            onClick={() => setShow(true)}
          >
            <DocumentIcon />
            <div className="tooltip align-top">View document</div>
          </button>
        </div>
      </div>
      <DocumentModal
        pdfURL={url}
        title={title}
        show={show}
        onClose={() => setShow(false)}
      />
    </Wrapper>
  );
};

export default Citation;
