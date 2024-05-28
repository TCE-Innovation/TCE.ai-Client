import React from "react";

import botImg from "../../../../assets/images/bot.png";

import { DisLikeIcon, LikeIcon } from "../../../icons";

import Wrapper from "./style";

const Message = ({ body, isAI }) => {
  const displayName = isAI ? "Chat" : "You";
  return (
    <Wrapper>
      <div className="author-avatar" data-name={displayName[0].toUpperCase()}>
        {isAI ? <img alt={"bot"} src={botImg} /> : null}
      </div>
      <div className="message-container">
        <div className="author">{displayName}</div>
        <div className="message-body">{body}</div>
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
    </Wrapper>
  );
};

export default Message;
