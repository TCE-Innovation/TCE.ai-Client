import React, {
  createContext,
  useContext as _useContext,
  useCallback,
  useRef,
} from "react";

const CacheContext = createContext();

export const useContext = () => _useContext(CacheContext);

const CacheContextProvider = ({ children, ...props }) => {
  const cacheRef = useRef({});
  const duration = props.cacheDuration || 30_000;

  const memoize = useCallback(async (key, callback, options = {}) => {
    const cache = cacheRef.current;
    const now = Date.now();
    if (cache[key]) {
      const cached = cache[key];
      if (now <= cached.expires && cached.isValid && !options.refetch) {
        return cached.value;
      }
    }
    if (options.onInvalidated) {
      options.onInvalidated?.({ getCacheValue, inValidate });
    }
    try {
      const value = await callback();
      const expireDuration = options.cacheDuration || duration;
      cache[key] = {
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
  }, []);

  const getCacheValue = (key) => cacheRef.current[key].value;

  const inValidate = (key) => {
    cacheRef.current[key].isValid = false;
  };

  return (
    <CacheContext.Provider
      value={{ memoize, inValidate, getCacheValue, ...props }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export default CacheContextProvider;
