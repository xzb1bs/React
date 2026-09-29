import AnimeItem from './AnimeItem';

function AnimeList({ items, onRemove, onChangeStatus }) {
  console.log('AnimeList rendered');

  if (items.length === 0) {
    return <p className="empty">No titles found</p>;
  }

  return (
    <div className="anime-list">
      {items.map((item) => (
        <AnimeItem
          key={item.id}                 // стабильный key
          item={item}
          onRemove={onRemove}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
}

export default AnimeList;