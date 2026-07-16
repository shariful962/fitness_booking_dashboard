import axios from "axios";

const getCookie = (name) => {
  if (typeof document === "undefined") {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }

  return null;
};

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  const authToken =
    localStorage.getItem("accessToken") || localStorage.getItem("access_token");

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});