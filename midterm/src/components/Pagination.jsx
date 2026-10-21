function Pagination({ page, totalPages, limit, onPageChange, onLimitChange }) {
  return (
    <nav className="pagination" aria-label="Library pages">
      <label>
        <span>Per page</span>
        <select
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
        >
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={20}>20</option>
        </select>
      </label>
      <div className="page-actions">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
