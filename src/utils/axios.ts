import axios from "axios";
import { AuthService } from "../services/auth";

const backend_url =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";
// Create axios instance
const axiosInstance = axios.create({
  baseURL: backend_url,
});

// Request interceptor to add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = AuthService.getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Get new tokens
        const tokens = await AuthService.refreshToken(refreshToken);
        AuthService.saveTokens(tokens);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        AuthService.clearTokens();
        // window.location.href = '/';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const axiosInstanceWithoutAuth = axios.create({
  baseURL: backend_url,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "69420",
  },
});

// export const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//     "Access-Control-Allow-Origin": "*",
//     "ngrok-skip-browser-warning": "69420",
//   },
// });
// axiosInstanceWithoutAuth.interceptors.request.use(
//   (config) => {
//     console.log("Making Request:", config);
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// axiosInstanceWithoutAuth.interceptors.response.use(
//   (response) => {
//     console.log("Response Received:", response);
//     return response;
//   },
//   (error) => {
//     console.error("Response Error:", error);
//     console.error("Error Details:", {
//       message: error.message,
//       code: error.code,
//       config: error.config,
//       request: error.request,
//       response: error.response,
//     });
//     return Promise.reject(error);
//   }
// );

export { axiosInstanceWithoutAuth };
export default axiosInstance;
