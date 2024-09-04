import React, {
  createContext,
  useContext as _useContext,
  useCallback,
  useRef,
} from "react";
import { useGlobal } from "../../hooks";

const CacheContext = createContext();

export const useContext = () => _useContext(CacheContext);

const CacheContextProvider = ({ children, ...props }) => {
  const { publishToSubscribers } = useGlobal();
  const cacheRef = useRef({});
  const duration = props.cacheDuration || 300_000;

  const computeKey = (key) => {
    const [name, args = {}] = Array.isArray(key) ? key : [key];
    return Object.entries(args).reduce((acc, [property, value]) => {
      return [acc, property, value].join("-");
    }, name);
  };

  const needUpdate = (key, options = {}) => {
    const cache = cacheRef.current;
    const now = Date.now();
    if (cache[key]) {
      const cached = cache[key];
      return now > cached.expires || !cached.isValid || options.refetch;
    }
    return true;
  };

  const memoize = useCallback(
    async (key, callback, options = {}) => {
      const cache = cacheRef.current;
      const now = Date.now();

      key = computeKey(key);

      if (!needUpdate(key, options)) return cache[key].value;
      if (options.onInvalidated) {
        options.onInvalidated?.({ inValidate });
      }
      try {
        const value = await callback();
        const expireDuration = options.cacheDuration || duration;
        cache[key] = {
          key,
          value,
          expires: new Date(now + expireDuration).getTime(),
          isValid: true,
          callback,
          options,
          duration: expireDuration,
        };
        return value;
      } catch (err) {
        throw err;
      }
    },
    // eslint-disable-next-line
    [duration]
  );

  const updateQuery = (key, callback) => {
    const now = Date.now();
    key = computeKey(key);
    const cache = cacheRef.current[key];
    if (!cache) return;
    const { duration, value: previousValue } = cache;
    const value = callback(previousValue);
    cacheRef.current[key] = {
      ...cacheRef.current[key],
      value,
      expires: new Date(now + duration).getTime(),
      isValid: true,
    };
    publishToSubscribers(key, value);
  };

  const inValidate = (key) => {
    const computedKey = computeKey(key);
    const cache = cacheRef.current;
    if (!cache[computedKey]) return;
    cache[computedKey].isValid = false;
  };

  return (
    <CacheContext.Provider
      value={{
        memoize,
        inValidate,
        updateQuery,
        computeKey,
        ...props,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export default CacheContextProvider;
