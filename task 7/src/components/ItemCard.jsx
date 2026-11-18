import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  return (
    <li className="library-card">
      <Link to={`/titles/${item.id}`} className="card-select">
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
      </Link>
    </li>
  );
}

export default ItemCard;