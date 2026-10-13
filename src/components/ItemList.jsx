function ItemList({ items, loading, error, selectedId, onSelect, onDelete }) {
  if (loading) {
    return <div className="state">Loading list...</div>;
  }

  if (error) {
    return <div className="state error">Error: {error}</div>;
  }

  if (items.length === 0) {
    return <div className="state">No items found</div>;
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li
          key={item.id}
          className={selectedId === item.id ? 'selected' : ''}
          onClick={() => onSelect(item.id)}
        >
          <div className="item-main">
            <strong>{item.name}</strong>
            <span className={`badge ${(item.status || '').toLowerCase()}`}>
              {item.status || '—'}
            </span>
          </div>
          <div className="item-meta">
            {item.type || '—'} · {item.year || '—'}
          </div>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;