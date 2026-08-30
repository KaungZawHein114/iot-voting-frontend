import axios from "axios";

const DEFAULT_API_URL = "https://iot-voting-system-1.onrender.com/api/v1";

export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

// Groups/uploads are served from the API's origin, not under /api/v1.
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

export const assetUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${ASSET_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Every error the UI shows should be a plain, readable sentence — never a
// raw Axios/network error object.
export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.request) return "Couldn't reach the server. Check your connection and try again.";
  return fallback;
};

export default client;
