import { useState } from "react";

import { useContext } from "../components/contexts/Cache";

const useMutation = (callback, options = {}) => {
  const { inValidate } = useContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const mutate = async (...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await callback(...params);
      setData(result);
      options.onSucess?.(result, { inValidate });
    } catch (error) {
      options.onError?.(error);
      setError(error);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    mutate,
  };
};

export default useMutation;
