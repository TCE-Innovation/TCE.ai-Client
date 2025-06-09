import React, {
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import botImg from "../../../../assets/images/bot.png";

import Feedback from "./Feedback";
import DocumentModal from "../../document/Modal";

import { Markdown, TypeWriter } from "../../../common";

import useGlobal from "../../../../hooks/useGlobal";

import Wrapper from "./style";
import { DocumentIcon } from "../../../icons";

const Message = ({
  body,
  id,
  isAI,
  citations,
  showfeedbackbuttons = true,
  showTypeWriterEffect = false,
  initialShowCitation = false,
  avatarRef,
}) => {
  const [imgError, setImgError] = useState(false);
  const [citationPointer, setCitationPointer] = useState(0);
  const [showCitations, setShowCitations] = useState(initialShowCitation);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [activeCitation, setActiveCitation] = useState(null);

  const { userProfileUrl } = useGlobal();

  const displayName = isAI ? "Chat" : "You";

  const isUserImgError = !userProfileUrl || imgError;

  const timerRef = useRef();

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const revealCitations = () => {
    setShowCitations(true);
    if (!citations || !citations.length) return;
    // Set first citation as selected by default
    if (citations.length > 0 && !selectedCitation) {
      setSelectedCitation(citations[0]);
    }

    const getTime = () => {
      const { title, pageNumber } = citations[citationPointer];
      const pageNumberText = `Page ${pageNumber}`;
      const length = title.length + pageNumberText.length;
      const t = length * 10;
      timerRef.current = setTimeout(() => {
        setCitationPointer((prev) => {
          clearTimeout(timerRef.current);
          if (prev < citations.length) {
            getTime();
          }
          return Math.min(prev + 1, citations.length);
        });
      }, t);
    };
    getTime();
  };

  // Transform citations into dropdown items format
  const citationItems = useMemo(() => {
    return (
      citations?.map((citation, index) => ({
        value: citation.id || index.toString(),
        label: citation.title,
        citation,
      })) || []
    );
  }, [citations]);

  // Open document directly when citation is clicked
  const handleCitationClick = (citation) => {
    setActiveCitation(citation);
    setShowDocumentModal(true);
    setSelectedCitation(citation);
  };

  return (
    <Wrapper>
      <div
        className={`author-avatar ${!isAI ? "user-avatar" : ""}`}
        data-name={!isAI ? displayName[0].toUpperCase() : ""}
        ref={avatarRef}
      >
        {isAI ? (
          <img alt={"bot"} src={botImg} />
        ) : isUserImgError ? null : (
          <img
            src={userProfileUrl}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              display: "block",
            }}
            alt={""}
            onError={() => {
              setImgError(true);
            }}
          />
        )}
      </div>
      <div className="message-container">
        <div className="author">{displayName}</div>
        <div className="message-body inter-font">
          {showTypeWriterEffect ? (
            <TypeWriter text={body} onEnd={revealCitations} speed={10} />
          ) : (
            <div>
              {isValidElement(body) ? body : <Markdown>{body}</Markdown>}
            </div>
          )}
          {showCitations && !!citations?.length && (
            <div className="citations-wrapper position-relative">
              <button
                className="d-flex align-items-center w-100 chat-button"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  padding: "12px 15px",
                  border: "1px solid var(--chatbot-light-grey)",
                  borderRadius: "8px",
                  backgroundColor: showDropdown
                    ? "var(--chatbot-light-grey)"
                    : "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.15s ease-in-out",
                }}
              >
                <div style={{ position: "relative", marginRight: "12px" }}>
                  <div
                    style={{
                      backgroundColor: "var(--chatbot-primary)",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DocumentIcon
                      style={{ color: "white", width: "16px", height: "16px" }}
                    />
                  </div>
                  {citations.length > 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-6px",
                        backgroundColor: "var(--chatbot-secondary)",
                        color: "var(--chatbot-text-primary)",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        border: "1px solid white",
                      }}
                    >
                      {citations.length}
                    </div>
                  )}
                </div>

                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "var(--chatbot-text-primary)",
                    }}
                  >
                    {`${citations.length} Document${
                      citations.length > 1 ? "s" : ""
                    }`}
                  </div>
                </div>

                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    backgroundColor: showDropdown
                      ? "rgba(0,0,0,0.05)"
                      : "transparent",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      color: "var(--chatbot-grey)",
                      transform: showDropdown ? "rotate(180deg)" : "none",
                      display: "block",
                      transformOrigin: "center",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "calc(100% + 5px)",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid var(--chatbot-light-grey)",
                    maxHeight: "250px",
                    overflow: "auto",
                    zIndex: 10,
                  }}
                >
                  {citationItems.map((item) => {
                    const isSelected =
                      selectedCitation &&
                      item.citation.id === selectedCitation.id;
                    return (
                      <div
                        key={item.value}
                        onClick={() => handleCitationClick(item.citation)}
                        style={{
                          padding: "12px 15px",
                          backgroundColor: isSelected
                            ? "var(--chatbot-light-grey)"
                            : "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "1px solid var(--chatbot-light-grey)",
                        }}
                      >
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "4px",
                            backgroundColor: "var(--chatbot-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                            flexShrink: 0,
                          }}
                        >
                          <DocumentIcon
                            style={{
                              color: "white",
                              width: "12px",
                              height: "12px",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            flexGrow: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.label}
                        </div>

                        <div
                          style={{
                            marginLeft: "8px",
                            fontSize: "0.85em",
                            color: "var(--chatbot-grey)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Page {item.citation.pageNumber}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        {isAI && showfeedbackbuttons ? <Feedback messageId={id} /> : null}
      </div>

      {/* Document modal that opens directly when clicking a citation */}
      {activeCitation && (
        <DocumentModal
          pdfURL={activeCitation.url}
          title={activeCitation.title}
          highlightedText={activeCitation.highlightedText}
          show={showDocumentModal}
          pageNumber={activeCitation.pageNumber}
          onClose={() => setShowDocumentModal(false)}
        />
      )}
    </Wrapper>
  );
};

export default Message;
