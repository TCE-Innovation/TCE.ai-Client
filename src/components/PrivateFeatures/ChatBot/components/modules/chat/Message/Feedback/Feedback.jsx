import React from "react";

import { useFeedback } from "../../../../../hooks";
import { DisLikeIcon, LikeIcon } from "../../../../icons";

const Feedback = ({ messageId }) => {
  const { enabledDisLike, enabledLike, handleDisLike, handleLike } =
    useFeedback(messageId);
  return (
    <div className="message-feedback-container">
      <button
        onClick={handleLike}
        className={`chat-button feedback-button tooltip-container ${
          enabledLike ? "settled" : ""
        }`}
      >
        <LikeIcon />
        <div className="tooltip align-top">like</div>
      </button>
      <button
        onClick={handleDisLike}
        className={`chat-button feedback-button tooltip-container ${
          enabledDisLike ? "settled" : ""
        }`}
      >
        <DisLikeIcon />
        <div className="tooltip align-top">dislike</div>
      </button>
    </div>
  );
};

export default Feedback;
