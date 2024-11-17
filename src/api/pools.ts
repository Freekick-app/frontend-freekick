/* eslint-disable @typescript-eslint/no-explicit-any */
import { backend_url, updateHeader, fetchWithRefresh } from "./config";

export async function submitAnswer(poolId: string, payload: any): Promise<any> {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/pools/${poolId}/submit_answer/`,
      {
        method: "POST",
        headers: updateHeader(),
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
}

interface PlaceBetResponse {
  questions: any[];
  pool_id: string;
}

export async function placeBet(
  matchId: any,
  betSize: number
): Promise<PlaceBetResponse> {
  try {
    const response = await fetchWithRefresh(`${backend_url}/pools/place_bet/`, {
      method: "POST",
      headers: updateHeader(),
      body: JSON.stringify({
        game_id: matchId,
        bet_size: betSize,
      }),
    });

    if (!response.ok) {
      const erData = await response.json();
      throw new Error(erData.error);
    }

    const data: PlaceBetResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error placing bet:", error);
    throw error;
  }
}

export async function getQuestions(initPoolId: any): Promise<any> {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/pools/${initPoolId}/questions/`,
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
    console.error("Error fetching questions:", error);
    throw error;
  }
}

export async function getMyPools(matchId?: any) {
  try {
    const url = `${backend_url}/pools/my_pools/?game_id=${matchId}`;
    const response = await fetchWithRefresh(url, {
      method: "GET",
      headers: updateHeader(),
    });

    if (!response.ok) {
      const erData = await response.json();
      throw new Error(erData.error);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
}
