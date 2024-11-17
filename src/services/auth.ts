const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

export interface AuthTokens {
  access: string;
  refresh: string;
}

export class AuthService {
  static async requestMessage(walletAddress: string): Promise<string> {
    try {
      const response = await fetch(
        `${API_URL}/blockchain/auth/request-message/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet_address: walletAddress }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to request message");
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error requesting message:", error);
      throw error;
    }
  }

  static async verifySignature(
    walletAddress: string,
    signature: string
  ): Promise<AuthTokens> {
    try {
      const response = await fetch(`${API_URL}/blockchain/auth/wallet-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: walletAddress, signature }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to verify signature");
      }

      const data = await response.json();
      return data.tokens;
    } catch (error) {
      console.error("Error verifying signature:", error);
      throw error;
    }
  }

  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await fetch(`${API_URL}/blockchain/auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        const status_code = response.status;
        if (status_code === 401) {
          this.clearTokens();
        }
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to refresh token");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }

  static saveTokens(tokens: AuthTokens): void {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  }

  static clearTokens(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }
}
