import ItemCard from './ItemCard';

function ItemList({
  items,
  loading,
  error,
  selectedId,
  onSelect,
  onDelete,
  total,
  actionLoading,
}) {
  if (loading) {
    return <div className="state" role="status">Loading your library...</div>;
  }

  if (error) {
    return <div className="state error" role="alert">Unable to load titles: {error}</div>;
  }

  if (items.length === 0) {
    return <div className="state">No titles match these filters. Try another search or add a title.</div>;
  }

  return (
    <section className="list-section" aria-label="Anime and manga titles">
      <div className="list-heading">
        <h2>Your library</h2>
        <span>{total} {total === 1 ? 'title' : 'titles'}</span>
      </div>
      <ul className="item-list">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={onSelect}
            onDelete={onDelete}
            actionLoading={actionLoading}
          />
        ))}
      </ul>
    </section>
  );
}

export default ItemList;