import { useEffect, useState } from "react";

const useStorage = (key, value = null) => {
  const [val, setVal] = useState(() => {
    const item = localStorage.getItem(key);
    if (item === null) return value;
    return JSON.parse(item);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);

  const update = (data) => {
    setVal(data);
  };

  const destroy = () => {
    localStorage.removeItem(key);
  };

  return [val, update, destroy];
};

export default useStorage