import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getItem } from '../services/service.js';

function TitleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const invalidId = !id || Number.isNaN(Number(id));

  useEffect(() => {
    let cancelled = false;
    const requestId = id;

    if (!requestId || Number.isNaN(Number(requestId))) {
      return;
    }

    Promise.resolve().then(async () => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      setItem(null);

      try {
        const data = await getItem(Number(requestId));
        if (!cancelled && String(requestId) === String(id)) {
          setItem(data);
        }
      } catch (err) {
        if (!cancelled && String(requestId) === String(id)) {
          setError(err.message || 'Title not found');
        }
      } finally {
        if (!cancelled && String(requestId) === String(id)) {
          setLoading(false);
        }
      }
    });

    return () => { cancelled = true; };
  }, [id]);

  if (invalidId) {
    return (
      <section className="page details-page">
        <p className="state error" role="alert">Invalid title ID</p>
        <div className="details-actions">
          <button type="button" className="btn secondary" onClick={() => navigate(-1)}>
            Back
          </button>
          <Link to="/titles" className="btn primary">All Titles</Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="page details-page">
        <p className="state">Loading title…</p>
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="page details-page">
        <p className="state error" role="alert">{error || 'Title not found'}</p>
        <div className="details-actions">
          <button type="button" className="btn secondary" onClick={() => navigate(-1)}>
            Back
          </button>
          <Link to="/titles" className="btn primary">All Titles</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page details-page">
      <div className="details-actions top">
        <button type="button" className="btn secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <Link to="/titles" className="btn ghost">All Titles</Link>
      </div>

      <article className="details-card">
        <header className="details-header">
          <h1>{item.name}</h1>
          <span className={`badge ${(item.status || '').toLowerCase()}`}>
            {item.status}
          </span>
        </header>

        <dl className="details-grid">
          <div><dt>Type</dt><dd>{item.type}</dd></div>
          <div><dt>Year</dt><dd>{item.year}</dd></div>
          <div><dt>Score</dt><dd>★ {Number(item.score).toFixed(1)}</dd></div>
          <div><dt>Episodes / Chapters</dt><dd>{item.episodes || '—'}</dd></div>
          <div><dt>Genre</dt><dd>{item.genre || '—'}</dd></div>
          <div><dt>Status</dt><dd>{item.status}</dd></div>
          <div className="full">
            <dt>Description</dt>
            <dd>{item.description || 'No description.'}</dd>
          </div>
          <div><dt>ID</dt><dd>{item.id}</dd></div>
        </dl>
      </article>
    </section>
  );
}

export default TitleDetails;