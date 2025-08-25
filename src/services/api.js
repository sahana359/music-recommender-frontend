export async function getSongSuggestions(keyword) {
  try {
    const response = await fetch(`${API_BASE_URL}/search_songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.songs || [];
  } catch (error) {
    console.error("Error fetching song suggestions:", error);
    return [];
  }
}
// api.js - handles all API calls

const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend

export async function getRecommendations(songTitle) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song_title: songTitle }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.recommendations; // return only the recommendations array
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
}
