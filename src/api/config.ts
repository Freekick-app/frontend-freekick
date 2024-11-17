/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthService } from "@/services/auth";
const backend_url =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

function updateHeader(initheaders?: any) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...initheaders,
  };
  const token = AuthService.getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    // headers["ngrok-skip-browser-warning"] = "true";
  }

  return headers;
}

async function fetchWithRefresh(
  url: string,
  options: RequestInit
): Promise<Response> {
  let response = await fetch(url, options);

  // If unauthorized, attempt token refresh
  if (response.status === 401) {
    try {
      const refreshToken = AuthService.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Get new tokens
      const tokens = await AuthService.refreshToken(refreshToken);
      AuthService.saveTokens(tokens);

      // Retry the request with updated tokens
      const newHeaders = {
        ...options.headers,
        Authorization: `Bearer ${tokens.access}`,
      };

      response = await fetch(url, { ...options, headers: newHeaders });
    } catch (error) {
      console.error("Token refresh failed:", error);

      // Remove tokens from local storage
      AuthService.clearTokens();
      throw error;
    }
  }

  return response;
}

export { backend_url, updateHeader, fetchWithRefresh };
