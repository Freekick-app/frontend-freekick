/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';
// import axios from 'axios';


declare global {
  interface Window {
    ethereum?: any;
  }
}

export class Web3AuthService {
  private static instance: Web3AuthService;
  private provider: ethers.BrowserProvider | null = null;

  private constructor() {
    if (window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  static getInstance(): Web3AuthService {
    if (!Web3AuthService.instance) {
      Web3AuthService.instance = new Web3AuthService();
    }
    return Web3AuthService.instance;
  }

  async connectWallet(): Promise<string> {
    if (!this.provider) {
      throw new Error('Please install MetaMask!');
    }

    try {
      // Request account access
      await this.provider?.send("eth_requestAccounts", [])
      const signer = await this.provider?.getSigner();
      const address = await signer?.getAddress();
      return address;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw "Error connecting wallet";
    }
  }

  async signMessage(message: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Please install MetaMask!');
    }

    try {
      const signer = await this.provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw "Error signing message";
    }
  }

  async getCurrentWalletAddress(): Promise<string | null> {
    if (!this.provider) {
      console.warn('MetaMask is not installed!');
      return null;
    }

    try {
      const signer = await this.provider?.getSigner();
      const address = await signer?.getAddress();
      return address;
    } catch (error) {
      console.error('Error getting wallet address:', error);
      return null;
    }
  }

  async disconnectWallet(): Promise<void> {
    if (!this.provider) {
      throw new Error('Please install MetaMask!');
    }

    try {
      await this.provider?.send("eth_requestAccounts", []);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw "Error disconnecting wallet";
    }
  }
}