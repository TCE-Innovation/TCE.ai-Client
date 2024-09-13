import { httpClient } from "./http";
import { responseHandler, errorHandler } from "./handlers";

import { parseRoute } from "../utils/url";

const api = {
  get: (url, params = {}) => {
    const route = parseRoute(url, params);
    return httpClient
      .get(route)
      .then(responseHandler)
      .catch(errorHandler);
  },
  create: (url, params = {}, config = {}) => {
    const { data = {}, query = {} } = params;
    const route = parseRoute(url, query);
    return httpClient
      .post(route, data, config)
      .then(responseHandler)
      .catch(errorHandler);
  },
  remove: (url, params = {}) => {
    const { query = {}, data = {} } = params;
    const route = parseRoute(url, query);
    return httpClient
      .delete(route, { data })
      .then(responseHandler)
      .catch(errorHandler);
  },
  update: (url, params = {}) => {
    const { data = {}, query = {} } = params;
    const route = parseRoute(url, query);
    return httpClient
      .put(route, data)
      .then(responseHandler)
      .catch(errorHandler);
  },
};

export default api;
