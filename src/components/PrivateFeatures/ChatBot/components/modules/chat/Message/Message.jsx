import React, { isValidElement } from "react";

import botImg from "../../../../assets/images/bot.png";

import Citation from "./Citation";
import Feedback from "./Feedback";

import { Markdown } from "../../../common";

import Wrapper from "./style";

const Message = ({ body, id, isAI, citations, showfeedbackbuttons = true }) => {
  const displayName = isAI ? "Chat" : "You";
  return (
    <Wrapper>
      <div
        className={`author-avatar ${!isAI ? "user-avatar" : ""}`}
        data-name={!isAI ? displayName[0].toUpperCase() : ""}
      >
        {isAI ? <img alt={"bot"} src={botImg} /> : null}
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
