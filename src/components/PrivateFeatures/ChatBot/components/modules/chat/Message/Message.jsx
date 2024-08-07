import React, {
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import botImg from "../../../../assets/images/bot.png";

import Citation from "./Citation";
import Feedback from "./Feedback";

import { Markdown, TypeWriter } from "../../../common";

import useGlobal from "../../../../hooks/useGlobal";

import Wrapper from "./style";

const Message = ({
  body,
  id,
  isAI,
  citations,
  showfeedbackbuttons = true,
  showTypeWriterEffect = false,
  initialShowCitation = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [citationPointer, setCitationPointer] = useState(0);
  const [showCitations, setShowCitations] = useState(initialShowCitation);

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

  const citationElements = useMemo(() => {
    return (
      citations?.map(({ id, ...citation }, i) => (
        <div key={citation.id + "-" + i}>
          <Citation {...citation} showTypeWriterEffect={showTypeWriterEffect} />
        </div>
      )) || []
    );
  }, [citations, showTypeWriterEffect]);

  const viewableElements = useMemo(() => {
    return React.Children.toArray(citationElements).slice(0, citationPointer);
  }, [citationPointer, citationElements]);

  return (
    <Wrapper>
      <div
        className={`author-avatar ${!isAI ? "user-avatar" : ""}`}
        data-name={!isAI ? displayName[0].toUpperCase() : ""}
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
            <div className="citations-wrapper">
              {showTypeWriterEffect ? viewableElements : citationElements}
            </div>
          )}
        </div>
        {isAI && showfeedbackbuttons ? <Feedback messageId={id} /> : null}
      </div>
    </Wrapper>
  );
};

export default Message;
