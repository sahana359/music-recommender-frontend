import React from "react";
import "./Recommendations.css";

const Recommendations = ({ results }) => {
  

  return (
    <div className="results-grid">
      {results.map((rec, idx) => {
        const metadata = rec.metadata || {};
        return (
          <div key={idx} className="result-card">
            {metadata.album_image && (
              <img
                src={metadata.album_image}
                alt={metadata.album}
                className="album-image"
              />
            )}
            <h4 className="track-name">{metadata.track_name || rec.song}</h4>
            <p className="artist-name">{metadata.artist || rec.artist}</p>
            <p className="album-name">{metadata.album}</p>
            {metadata.preview_url && (
              <audio controls className="preview-audio">
                <source src={metadata.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Recommendations;
