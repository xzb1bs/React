import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItemsList } from '../services/service.js';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await getItemsList('?limit=200&page=1');
        if (!cancelled) setItems(result.data || []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!typeFilter) return items;
    return items.filter((i) => i.type === typeFilter);
  }, [items, typeFilter]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const avgScore =
      total === 0
        ? 0
        : filtered.reduce((sum, i) => sum + Number(i.score || 0), 0) / total;
    const anime = filtered.filter((i) => i.type === 'Anime').length;
    const manga = filtered.filter((i) => i.type === 'Manga').length;
    const byStatus = filtered.reduce((acc, i) => {
      const s = i.status || 'Unknown';
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
    const byGenre = filtered.reduce((acc, i) => {
      const g = (i.genre || 'Unknown').split(',')[0].trim() || 'Unknown';
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {});
    const topGenres = Object.entries(byGenre)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    return { total, avgScore, anime, manga, byStatus, topGenres };
  }, [filtered]);

  if (loading) {
    return (
      <section className="page dashboard-page">
        <p className="state">Loading statistics…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page dashboard-page">
        <p className="state error">{error}</p>
      </section>
    );
  }

  return (
    <section className="page dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="muted">Live stats from the catalog API</p>
      </div>

      <div className="dashboard-filter">
        <label>
          Filter by type
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Anime">Anime</option>
            <option value="Manga">Manga</option>
          </select>
        </label>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <h3>Total titles</h3>
          <p className="stat-value">{stats.total}</p>
        </article>
        <article className="stat-card">
          <h3>Average score</h3>
          <p className="stat-value">★ {stats.avgScore.toFixed(2)}</p>
        </article>
        <article className="stat-card">
          <h3>Anime</h3>
          <p className="stat-value">{stats.anime}</p>
        </article>
        <article className="stat-card">
          <h3>Manga</h3>
          <p className="stat-value">{stats.manga}</p>
        </article>
      </div>

      <div className="breakdowns">
        <article className="breakdown-card">
          <h3>By status</h3>
          <ul>
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <li key={status}>
                <span>{status}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </article>
        <article className="breakdown-card">
          <h3>Top genres</h3>
          <ul>
            {stats.topGenres.map(([genre, count]) => (
              <li key={genre}>
                <span>{genre}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <p className="dashboard-links">
        <Link to="/titles" className="btn primary">Browse all titles</Link>
        {typeFilter && (
          <Link
            to={`/titles?type=${encodeURIComponent(typeFilter)}`}
            className="btn secondary"
          >
            Open filtered list
          </Link>
        )}
      </p>
    </section>
  );
}

export default Dashboard;