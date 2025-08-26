import React, { useState } from "react";
import "./SearchBar.css";
import { getSongSuggestions } from "../services/api";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 3) {
      const songs = await getSongSuggestions(value);
      setSuggestions(songs);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container" style={{ position: "relative", width: 500 }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a song..."
        className="search-input"
        autoComplete="off"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {suggestions.length > 0 && (
        <ul style={{
          position: "absolute",
          top: "48px",
          left: 0,
          width: "100%",
          background: "#9887b8",
          border: "1px solid #311c5a",
          borderRadius: "10px",
          margin: 0,
          padding: "8px 0",
          listStyle: "none",
          zIndex: 10,
          maxHeight: "220px",
          boxShadow: "0 4px 16px rgba(49,28,90,0.10)",
          overflowY: "auto"
        }}>
          {suggestions.map((song, idx) => (
            <li
              key={idx}
              style={{
                padding: "10px 24px",
                cursor: "pointer",
                fontSize: "17px",
                color: "#ffffffff",
                transition: "background 0.2s, color 0.2s",
                borderBottom: idx !== suggestions.length - 1 ? "1px solid #e1d8f1ff" : "none"
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#000000'}
              onMouseLeave={e => e.currentTarget.style.color = '#ffffffff'}
              onClick={() => { setQuery(song); setSuggestions([]); }}
            >
              <span style={{ fontWeight: 500 }}>{song}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;