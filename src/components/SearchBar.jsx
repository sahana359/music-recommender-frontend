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
        placeholder="Search..."
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
          background: "#f5ecd7",
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
                color: "#311c5a",
                transition: "background 0.2s, color 0.2s",
                borderBottom: idx !== suggestions.length - 1 ? "1px solid #e0d6f7" : "none"
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e0d6f7'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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