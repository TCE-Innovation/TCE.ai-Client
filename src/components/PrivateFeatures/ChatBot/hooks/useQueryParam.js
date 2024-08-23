import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useQueryParam = () => {
  const [params, setParams] = useState({});
  const location = useLocation();

  const push = (query, { replace = false, reverse = false } = {}) => {
    let newParams = {};
    if (reverse) {
      for (const key in params) {
        if (!(key in query)) {
          newParams[key] = params[key];
        }
      }
    } else {
      newParams = { ...(replace ? {} : params), ...query };
    }
    const search = ["?", new URLSearchParams(newParams).toString()].join("");
    let newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      location.pathname +
      search;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setParams(newParams);
  };

  const getQuery = (key) => {
    return params[key] || "";
  };

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

  return { params, push, getQuery };
};

export default useQueryParam;
