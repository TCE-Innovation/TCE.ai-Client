import { useLayoutEffect, useRef } from "react";

const useScroll = () => {
  const containerRef = useRef(null);

  const scrollIntoView = ({ smooth } = { smooth: false }) => {
    const container = containerRef.current;
    container.scroll({
      left: 0,
      top: container.scrollHeight - container.clientHeight,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  useLayoutEffect(() => {
    scrollIntoView();
  }, [containerRef.current]);

  return {
    scrollIntoView,
    containerRef,
  };
};

export default useScroll;
