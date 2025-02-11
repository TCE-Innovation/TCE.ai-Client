import { useCallback, useRef } from "react";

/**
 *
 * @description delay: in seconds
 */

const useDebounce = (callback, delay, ...rest) => {
  const timerRef = useRef(null);

  const cancel = useCallback((...args) => {
    clearTimeout(timerRef.current);
  }, []);

  const handler = useCallback(
    (...args) => {
      cancel();
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay * 1000);
    },
    // eslint-disable-next-line
    [delay, cancel, ...rest]
  );

  return [handler, cancel];
};

export default useDebounce;
