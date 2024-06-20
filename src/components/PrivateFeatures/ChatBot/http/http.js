import axios from "axios";
import { getAccessToken } from "../utils/auth";

const baseURL =
  process.env.REACT_APP_CHATBOT_API_URL ||
  "https://web-aichat-be2-dev.azurewebsites.net";

if (!baseURL) throw new Error("server URL not found!");

export const httpClient = axios.create({
  baseURL,
});

httpClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
