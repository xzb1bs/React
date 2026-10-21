function ItemCard({ item, selected, onSelect, onDelete, actionLoading }) {
  return (
    <li className={`library-card${selected ? ' selected' : ''}`}>
      <button
        type="button"
        className="card-select"
        onClick={() => onSelect(item.id)}
        aria-pressed={selected}
      >
        <span className="card-heading">
          <strong>{item.name}</strong>
          <span className={`badge ${(item.status || '').toLowerCase()}`}>
            {item.status}
          </span>
        </span>
        <span className="item-meta">
          {item.type} · {item.year} · ★ {Number(item.score).toFixed(1)}
        </span>
        <span className="card-description">{item.description}</span>
      </button>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(item.id)}
        disabled={actionLoading}
        aria-label={`Delete ${item.name}`}
      >
        Delete
      </button>
    </li>
  );
}

export default ItemCard;
