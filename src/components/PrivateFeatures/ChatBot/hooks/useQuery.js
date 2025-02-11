import { useEffect, useState } from "react";
import { useContext } from "../components/contexts/Cache";

import { useGlobal } from "../hooks";

const useQuery = (key, callback, options = {}) => {
  const { memoize, computeKey, updateQuery, inValidate } = useContext();
  const { registerSubscriber } = useGlobal();

  const [loading, setLoading] = useState(Boolean(!options.disableRunOnMount));
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const refetch = async (newOptions = { refetch: true }) => {
    const result = await memoize(key, callback, { ...options, newOptions });
    setData(result);
  };

  useEffect(() => {
    const keyString = computeKey(key);
    const unregister = registerSubscriber(keyString, (newData) => {
      setData(newData);
    });
    return () => {
      unregister();
    };
    // eslint-disable-next-line
  }, [computeKey(key)]);

  const updateData = (callback) => {
    updateQuery(key, callback);
  };

  const reset = () => {
    inValidate(key);
  };

  useEffect(() => {
    if (options.disableRunOnMount || !computeKey(key)) return;
    (async () => {
      setLoading(true);
      try {
        await refetch(options);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [options.disableRunOnMount, computeKey(key)]);

  return {
    data,
    loading,
    error,
    refetch,
    updateData,
    reset,
  };
};

export default useQuery;
