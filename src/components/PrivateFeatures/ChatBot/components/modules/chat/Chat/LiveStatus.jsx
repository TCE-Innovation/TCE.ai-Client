import React, { useEffect, useRef } from "react";
import { useGlobal } from "../../../../hooks";

const LiveStatus = () => {
  const container = useRef();
  const { query } = useGlobal();
  const { params } = query;

  const isLive = params.is_live;

  useEffect(() => {
    if ("is_live" in params) {
      container.current.style.opacity = 1;
    }
  }, [params]);

  return (
    <div
      ref={container}
      style={{ opacity: 0 }}
      className={`chatbot-live-status ${isLive ? "" : "pursuit"}`}
    >
      {isLive ? "Live" : "Pursuit"}
    </div>
  );
};

export default LiveStatus;
