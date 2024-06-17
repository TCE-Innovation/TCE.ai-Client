import React, { isValidElement, useState } from "react";

import botImg from "../../../../assets/images/bot.png";

import Citation from "./Citation";
import Feedback from "./Feedback";

import { Markdown } from "../../../common";

import useGlobal from "../../../../hooks/useGlobal";

import Wrapper from "./style";

const Message = ({ body, id, isAI, citations, showfeedbackbuttons = true }) => {
  const [imgError, setImgError] = useState(false);

  const { userProfileUrl } = useGlobal();

  const displayName = isAI ? "Chat" : "You";

  const isUserImgError = !userProfileUrl || imgError;

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
          <div>{isValidElement(body) ? body : <Markdown>{body}</Markdown>}</div>
          {!!citations?.length && (
            <div className="citations-wrapper">
              {citations.map(({ id, ...citation }, i) => (
                <div key={citation.id + "-" + i}>
                  <Citation {...citation} />
                </div>
              ))}
            </div>
          )}
        </div>
        {isAI && showfeedbackbuttons ? <Feedback messageId={id} /> : null}
      </div>
    </Wrapper>
  );
};

export default Message;
