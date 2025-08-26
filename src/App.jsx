import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Recommendations from "./components/Recommendations";
import { getRecommendations } from "./services/api";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setResults([]); // Clear previous results
    try {
      const recs = await getRecommendations(query);
      console.log("Recommendations received in App:");
      console.log(recs);
      if (!recs || recs.length === 0) {
        setError("No recommendations found.");
        setResults([]);
      } else {
        setResults(recs);
      }
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      setResults([]);
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif", backgroundColor: "#f0ece3ff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#000", marginBottom: "30px", fontWeight: 400, fontSize: "2.5rem", letterSpacing: "1px" }}>
        Music Recommendations
      </h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div style={{ textAlign: "center", margin: "30px" }}>
          <div className="loader" style={{ display: "inline-block", width: 40, height: 40, border: "4px solid #ccc", borderTop: "4px solid #1db954", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div>Loading recommendations...</div>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", color: "#d32f2f", margin: "30px" }}>{error}</div>
      ) : (
        <Recommendations results={results} />
      )}
    </div>
  );
}

export default App;
