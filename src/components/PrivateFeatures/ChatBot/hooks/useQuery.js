import { useEffect, useState } from "react";
import { useContext } from "../components/contexts/Cache";

const useQuery = (key, callback, options = {}) => {
  const { memoize } = useContext();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    const result = await memoize(key, callback, options);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    if (options.disableRunOnMount) return;
    (async () => {
      try {
        await refetch();
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
