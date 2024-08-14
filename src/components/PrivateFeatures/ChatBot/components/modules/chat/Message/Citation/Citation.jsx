import React, { useState } from "react";

import DocumentModal from "../../../document/Modal";

import { DocumentIcon } from "../../../../icons";

import { TypeWriter } from "../../../../common";

import Wrapper from "./style";

const Citation = ({
  highlightedText,
  pageNumber,
  url,
  title,
  showTypeWriterEffect = false,
}) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState(!showTypeWriterEffect);
  const [showDocument, setShowDocument] = useState(!showTypeWriterEffect);
  return (
    <Wrapper>
      <div className="citation-line">
        <div style={{ marginRight: "auto" }}>
          {showTypeWriterEffect ? (
            <TypeWriter
              speed={5}
              text={title} 
              onEnd={() => setShowPage(true)}
            />
          ) : (
            title
          )}
        </div>
        <div>
          {showTypeWriterEffect ? (
            !showPage ? null : (
              <TypeWriter
                speed={5}
                text={`Page ${pageNumber}`}
                onEnd={() => setShowDocument(true)}
              />
            )
          ) : (
            <>Page {pageNumber}</>
          )}
        </div>
        <div>
          {showDocument && (
            <button
              className="chat-button document-open-btn tooltip-container"
              onClick={() => setShow(true)}
            >
              <DocumentIcon />
              <div className="tooltip align-top">View document</div>
            </button>
          )}
        </div>
      </div>
      <DocumentModal
        pdfURL={url}
        title={title}
        highlightedText={highlightedText}
        show={show}
        pageNumber={pageNumber}
        onClose={() => setShow(false)}
      />
    </Wrapper>
  );
};

export default Citation;
