import { useCallback, useEffect, useState } from "react";

const useStorage = (key, value = null) => {
  const [val, setVal] = useState(() => {
    let item = localStorage.getItem(key);
    item = item ? JSON.parse(item) : value;
    return item;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);

  const update = (data) => {
    setVal(data);
  };

  const destroy = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return [val, update, destroy];
};

export default useStorage;
