import { Link } from 'react-router-dom';
import useItemsCount from '../hooks/useItemsCount';

function Home() {
  const { count, loading, error } = useItemsCount();

  return (
    <section className="page home-page">
      <div className="hero">
        <div className="hero-text">
          <h1>Anime &amp; Manga Library</h1>
          <p>
            Browse a curated catalog of anime and manga, track your watch status,
            filter by type and status, and explore detailed title information —
            all with client-side routing and a responsive interface.
          </p>
          <div className="hero-actions">
            <Link to="/titles" className="btn primary">Browse Titles</Link>
            <Link to="/dashboard" className="btn secondary">View Dashboard</Link>
            <Link to="/about" className="btn ghost">About</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <img
              src="/allanime.jpg"
              alt="Collection of anime and manga"
              className="home-image"
            />
            <strong>
              {loading ? 'Loading catalog…' : error ? 'Catalog unavailable' : `${count} titles`}
            </strong>
            {error && <span className="home-error" role="alert">{error}</span>}
            <span>Search · Filter · Paginate</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;