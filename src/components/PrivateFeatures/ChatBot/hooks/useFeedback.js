import { useState } from "react";

import { feedbackService } from "../services";
import useAlert from "./useAlert";

const useFeedback = (messageId) => {
  const [enabledLike, setIsEnabledLike] = useState(false);
  const [enabledDisLike, setIsEnabledDisLike] = useState(false);
  const { createAlert } = useAlert();

  const handleLike = async () => {
    if (enabledLike || !messageId) return;
    const { message, success } = await feedbackService.sendFeedback({
      messageId,
      feedback: "POSITIVE",
    });
    if (!success) return createAlert({ message, type: "danger" });
    setIsEnabledLike(true);
    setIsEnabledDisLike(false);
  };
  const handleDisLike = async () => {
    if (enabledDisLike || !messageId) return;
    const { message, success } = await feedbackService.sendFeedback({
      messageId,
      feedback: "NEGATIVE",
    });
    if (!success) return createAlert({ message, type: "danger" });
    setIsEnabledDisLike(true);
    setIsEnabledLike(false);
  };

  return {
    handleDisLike,
    handleLike,
    enabledLike,
    enabledDisLike,
  };
};

export default useFeedback;
