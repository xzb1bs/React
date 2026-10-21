function SearchBar({ value, onChange }) {
  return (
    <label className="search-control">
      <span>Search library</span>
      <div className="search-input-wrap">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Name, description, or genre"
          aria-label="Search by name, description, or genre"
        />
        {value && (
          <button type="button" onClick={() => onChange('')} aria-label="Clear search">
            Clear
          </button>
        )}
      </div>
    </label>
  );
}

export default SearchBar;
