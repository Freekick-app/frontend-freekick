import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api';

export interface AuthTokens {
  access: string;
  refresh: string;
}

export class AuthService {
  static async requestMessage(walletAddress: string): Promise<string> {
    
    try {
      const response = await axios.post(`${API_URL}/blockchain/auth/request-message/`, {
        wallet_address: walletAddress,
      });
      return response.data.message;
    } catch (error) {
      console.error('Error requesting message:', error);
      throw error;
    }
  }

  static async verifySignature(walletAddress: string, signature: string): Promise<AuthTokens> {
    try {
      const response = await axios.post(`${API_URL}/blockchain/auth/wallet-login/`, {
        wallet_address: walletAddress,
        signature: signature,
      });
      if (response.status !== 200){
        throw response?.data?.error
      }
      console.log(response.data);

      return response?.data?.tokens;

    } catch (error) {
      console.error('Error verifying signature:', error);
      throw error;
    }
  }

  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await axios.post(`${API_URL}/blockchain/auth/refresh/`, {
        refresh: refreshToken,
      });
      console.log(response.data)
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  static saveTokens(tokens: AuthTokens): void {
    debugger
    console.log(tokens);
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
}