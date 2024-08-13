import { useState } from "react";

import { feedbackService } from "../services";
import useGlobal from "./useGlobal";

const POSITIVE = "POSITIVE";
const NEGATIVE = "NEGATIVE";
const NEUTRAL = "NEUTRAL";

const useFeedback = (messageId) => {
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [enabledLike, setIsEnabledLike] = useState(false);
  const [enabledDisLike, setIsEnabledDisLike] = useState(false);

  const { createAlert } = useGlobal();

  const handleFeedback = (_feedback, enabled, setEnabled) => async () => {
    if (!messageId || loadingFeedback) return;
    const feedback = enabled ? NEUTRAL : _feedback;
    setLoadingFeedback(true);
    setEnabled((prev) => !prev);
    const { message, success } = await feedbackService.sendFeedback({
      messageId,
      feedback,
    });
    if (!success) return createAlert({ message, type: "danger" });
    setLoadingFeedback(false);
  };

  const like = handleFeedback(POSITIVE, enabledLike, setIsEnabledLike);
  const dislike = handleFeedback(NEGATIVE, enabledDisLike, setIsEnabledDisLike);

  const handleLike = () => {
    like();
    if (enabledDisLike) setIsEnabledDisLike(false);
  };

  const handleDisLike = () => {
    dislike();
    if (enabledLike) setIsEnabledLike(false);
  };

  return {
    handleDisLike,
    handleLike,
    enabledLike,
    enabledDisLike,
  };
};

export default useFeedback;
