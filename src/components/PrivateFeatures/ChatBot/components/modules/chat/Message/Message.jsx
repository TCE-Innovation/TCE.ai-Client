import React from "react";

import botImg from "../../../../assets/images/bot.png";

import Citation from "./Citation";
import Feedback from "./Feedback";

import Wrapper from "./style";

const Message = ({ body, id, isAI, citations, showfeedbackbuttons = true }) => {
  const displayName = isAI ? "Chat" : "You";
  return (
    <Wrapper>
      <div className="author-avatar" data-name={displayName[0].toUpperCase()}>
        {isAI ? <img src={botImg} /> : null}
      </div>
      <div className="message-container">
        <div className="author">{displayName}</div>
        <div className="message-body inter-font">
          <div>{body}</div>
          {citations &&
            citations.map(({ id, ...citation }, i) => (
              <Citation key={citation.id + "-" + i} {...citation} />
            ))}
        </div>
        {isAI && showfeedbackbuttons ? <Feedback messageId={id} /> : null}
      </div>
    </Wrapper>
  );
};

export default Message;
