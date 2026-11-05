function SearchBar({ value, onChange }) {
  return (
    <label className="search-control">
      Search
      <div className="search-input-wrap">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Name, genre, description…"
        />
      </div>
    </label>
  );
}

export default SearchBar;
