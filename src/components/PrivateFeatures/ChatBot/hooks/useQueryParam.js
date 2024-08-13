import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useQueryParam = () => {
  const [params, setParams] = useState({});
  const location = useLocation();

  useEffect(() => {
    var queryParams = new URLSearchParams(location.search);
    setParams(
      [...queryParams].reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: value,
        };
      }, {})
    );
  }, [location]);

  return params;
};

export default useQueryParam;
