import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api';

export interface TonAuthTokens {
  access: string;
  refresh: string;
}

export interface TonWalletAccount {
  address: string;
  chain: string;
  publicKey: string;
}

export class TonAuthService {
  // Get the TON proof payload from the server
  static async getTonPayload(): Promise<{ payload: string }> {
    try {
      const response = await axios.get(`${API_URL}/blockchain/auth/ton-payload/`);
      return response.data;
    } catch (error) {
      console.error('Error getting TON payload:', error);
      throw error;
    }
  }

  // Verify TON proof and get authentication tokens
  static async verifyTonProof(proof: string, wallet: TonWalletAccount): Promise<TonAuthTokens> {
    try {
      const response = await axios.post(`${API_URL}/blockchain/auth/ton-login/`, {
        proof,
        wallet
      });

      if (response.status !== 200) {
        throw response?.data?.error;
      }
      return response.data;
    } catch (error) {
      console.error('Error verifying TON proof:', error);
      throw error;
    }
  }

  // Refresh authentication tokens
  static async refreshToken(refreshToken: string): Promise<TonAuthTokens> {
    try {
      const response = await axios.post(`${API_URL}/blockchain/auth/refresh/`, {
        refresh: refreshToken,
      });
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  // Token management methods
  static saveTokens(tokens: TonAuthTokens): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  static clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  static getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}