import axios from "axios";
import { requestAccessToken } from "../utils/auth";

export const httpClient = axios.create({
  baseURL:
    process.env.REACT_APP_CHATBOT_API_URL ||
    "https://web-aichat-be2-dev.azurewebsites.net",
});

let token = null;

httpClient.interceptors.request.use(async (config) => {
  token = token || (await requestAccessToken());
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
