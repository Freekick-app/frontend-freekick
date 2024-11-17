/* eslint-disable @typescript-eslint/no-explicit-any */
import { backend_url, updateHeader, fetchWithRefresh } from "./config";

export async function getProfile() {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/blockchain/wallets/`,
      {
        method: "GET",
        headers: updateHeader(),
      }
    );

    if (!response.ok) {
      const erData = await response.json();
      throw new Error(erData.error);
    }

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export async function deposit(amount: string, modal: string): Promise<any> {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/blockchain/auth/deposit-aeon/`,
      {
        method: "POST",
        headers: updateHeader(),
        body: JSON.stringify({
          amount:amount,
          modal:modal,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error depositing:", error);
    throw error;
  }
}

export async function queryOrder() {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/blockchain/auth/query-order`,
      {
        method: "GET",
        headers: updateHeader(),
      }
    );

    if (!response.ok) {
      const erData = await response.json();
      throw new Error(erData.error);
    }

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking orders", error);
    throw error;
  }
}

export async function requestWithdrawal(
  address: string,
  balance: string
): Promise<any> {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/blockchain/wallets/_/request_withdrawal`,
      {
        method: "POST",
        headers: updateHeader(),
        body: JSON.stringify({
          address,
          balance,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error request withdrawal", error);
    throw error;
  }
}
