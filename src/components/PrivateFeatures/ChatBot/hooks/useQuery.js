import { useEffect, useState } from "react";
import { useContext } from "../components/contexts/Cache";

import { useGlobal } from "../hooks";

const useQuery = (key, callback, options = {}) => {
  const { memoize, computeKey } = useContext();
  const { registerSubscriber } = useGlobal();

  const [loading, setLoading] = useState(true);
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
  }, []);

  useEffect(() => {
    if (options.disableRunOnMount) return;
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
  }, [options.disableRunOnMount]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useQuery;
