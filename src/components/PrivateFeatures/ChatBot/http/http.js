import axios from "axios";
import { requestAccessToken } from "../utils/auth";

const baseURL =
  process.env.REACT_APP_CHATBOT_API_URL ||
  "https://web-aichat-be2-dev.azurewebsites.net";

if (!baseURL) throw new Error("server URL not found!");

export const httpClient = axios.create({
  baseURL,
});

let token = null;

httpClient.interceptors.request.use(async (config) => {
  token = token || (await requestAccessToken());
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
