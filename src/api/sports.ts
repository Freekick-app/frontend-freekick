/* eslint-disable @typescript-eslint/no-explicit-any */
import { backend_url, updateHeader, fetchWithRefresh } from "./config";

export async function getGames(matchId?: string) {
  try {
    let url = `${backend_url}/sports/games`;
    if (matchId !== undefined) {
      url = `${url}/${matchId}`;
    }
    if (backend_url.includes("ngrok-free.app")) {
      url += "?ngrok-skip-browser-warning=true";
    }
    const response = await fetch(url);
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

export async function getTeams(teamId: number) {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/sports/teams/${teamId}/roster`,
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
    console.error("Error fetching teams:", error);
    throw error;
  }
}

export async function getStats(matchId: string, type: string = "stats") {
  try {
    const response = await fetchWithRefresh(
      `${backend_url}/sports/games/${matchId}/${type}`,
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
    console.error("Error fetching teams:", error);
    throw error;
  }
}
