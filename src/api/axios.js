import axios from "axios";
import store from "../store/store";
import { setCredentials, logout } from "../store/slices/authSlice";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Attach access token from Redux
API.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

let isRefreshing = false;
let failedQueue = [];

// Queue tokens during refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Handle 401 + refresh token
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshURL =
          (import.meta.env.VITE_API_URL || "http://localhost:5000") +
          "/api/auth/refresh";

        const refreshRes = await axios.post(
          refreshURL,
          {},
          { withCredentials: true }
        );

        const newToken = refreshRes.data.accessToken;
        const user = refreshRes.data.user;

        store.dispatch(setCredentials({ user, accessToken: newToken }));

        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        store.dispatch(logout());
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default API;
