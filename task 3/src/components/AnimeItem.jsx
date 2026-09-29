import { useState } from 'react';

function AnimeItem({ item, onRemove, onChangeStatus }) {
  console.log(`AnimeItem rendered: ${item.title}`);

  const [isExpanded, setIsExpanded] = useState(false);
  const [score, setScore] = useState(0);

  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prev) => prev + 1); 
  };

  return (
    <div className="anime-item" key={resetKey}>
      <div className="anime-header">
        <div>
          <h3>{item.title}</h3>
          <span className="type">{item.type}</span>
        </div>
        <span className={`badge ${item.status.toLowerCase()}`}>
          {item.status}
        </span>
      </div>

      <p className="episodes">{item.episodes}</p>

      {isExpanded && (
        <div className="anime-details">
          <p>Your score: {score} / 10</p>
          <div className="score-buttons">
            <button onClick={() => setScore(Math.max(0, score - 1))}>-1</button>
            <button onClick={() => setScore(Math.min(10, score + 1))}>+1</button>
          </div>
        </div>
      )}

      <div className="anime-actions">
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>

        <select
          value={item.status}
          onChange={(e) => onChangeStatus(item.id, e.target.value)}
        >
          <option value="Planned">Planned</option>
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>

        <button onClick={handleReset} className="reset-btn">
          Reset Local State
        </button>

        <button onClick={() => onRemove(item.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default AnimeItem;