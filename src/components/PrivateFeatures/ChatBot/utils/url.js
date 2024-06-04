export const parseRoute = (url, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const route = [url, queryString].filter(Boolean).join("?");
  return route;
};
