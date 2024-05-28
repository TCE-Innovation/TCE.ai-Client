import React, { useState } from "react";

import botImg from "../../../../assets/images/bot.png";

import { DisLikeIcon, LikeIcon, DocumentIcon } from "../../../icons";

import DocumentModal from "../../document/Modal";

import Wrapper from "./style";

const Message = ({ body, isAI }) => {
  const [show, setShow] = useState(false);
  const displayName = isAI ? "Chat" : "You";
  return (
    <Wrapper>
      <div className="author-avatar" data-name={displayName[0].toUpperCase()}>
        {isAI ? <img src={botImg} /> : null}
      </div>
      <div className="message-container">
        <div className="author">{displayName}</div>
        <div className="message-body">
          <div>{body}</div>
          {isAI && (
            <button className="chat-button document-open-btn" onClick={() => setShow(true)}>
              <DocumentIcon />
            </button>
          )}
        </div>
        {isAI ? (
          <div className="message-feedback-container">
            <button className="chat-button feedback-button tooltip-container">
              <LikeIcon />
              <div className="tooltip align-top">like</div>
            </button>
            <button className="chat-button feedback-button tooltip-container">
              <DisLikeIcon />
              <div className="tooltip align-top">dislike</div>
            </button>
          </div>
        ) : null}
      </div>
      {isAI && <DocumentModal show={show} onClose={() => setShow(false)} />}
    </Wrapper>
  );
};

export default Message;
