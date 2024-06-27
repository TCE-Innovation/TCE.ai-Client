import { useCallback, useRef } from "react";

const useScroll = () => {
  const containerRef = useRef(null);

  const scrollBottom = useCallback(({ smooth } = { smooth: false }) => {
    const container = containerRef.current;
    container.scroll({
      left: 0,
      top: container.scrollHeight - container.clientHeight,
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  const scrollIntoView = useCallback(() => {
    containerRef.current?.scrollIntoView();
  }, []);

  return {
    scrollIntoView,
    containerRef,
    scrollBottom,
  };
};

export default useScroll;
