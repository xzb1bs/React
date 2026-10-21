function Filters({ status, type, onStatusChange, onTypeChange }) {
  return (
    <div className="filter-controls">
      <label>
        <span>Status</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="">All statuses</option>
          <option value="Planned">Planned</option>
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>
      </label>
      <label>
        <span>Format</span>
        <select value={type} onChange={(event) => onTypeChange(event.target.value)}>
          <option value="">Anime &amp; manga</option>
          <option value="Anime">Anime</option>
          <option value="Manga">Manga</option>
        </select>
      </label>
    </div>
  );
}

export default Filters;
