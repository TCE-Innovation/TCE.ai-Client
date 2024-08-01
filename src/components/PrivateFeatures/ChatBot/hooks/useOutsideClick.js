import { useEffect, useRef } from "react";

const useOutsideClick = ({ onClickOutside }) => {
  const targetRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      const currentTarget = e.target;
      const isOutsideClick = !targetRef.current.contains(currentTarget);
      if (isOutsideClick) {
        onClickOutside?.();
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return {
    targetRef,
  };
};

export default useOutsideClick;
