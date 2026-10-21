function SortControls({ sort, order, onSortChange, onOrderChange }) {
  return (
    <div className="sort-controls">
      <label>
        <span>Sort by</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="name">Name</option>
          <option value="year">Year</option>
          <option value="score">Score</option>
        </select>
      </label>
      <label>
        <span>Order</span>
        <select value={order} onChange={(event) => onOrderChange(event.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}

export default SortControls;
