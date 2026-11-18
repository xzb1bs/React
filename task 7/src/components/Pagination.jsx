function Pagination({ page, totalPages, limit, onPageChange, onLimitChange }) {
  const safePage = Math.min(page, totalPages);

  return (
    <div className="pagination">
      <label>
        Per page
        <select value={limit} onChange={(event) => onLimitChange(Number(event.target.value))}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </label>
      <div className="page-actions">
        <button type="button" disabled={safePage <= 1} onClick={() => onPageChange(safePage - 1)}>
          Previous
        </button>
        <span>{safePage} / {totalPages}</span>
        <button type="button" disabled={safePage >= totalPages} onClick={() => onPageChange(safePage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
