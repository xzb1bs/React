import { useState } from 'react';

const statuses = ['Planned', 'Watching', 'Completed', 'Dropped'];

function ItemDetails({
  details,
  loading,
  error,
  actionLoading,
  onChangeStatus,
  onEdit,
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  if (loading) {
    return <div className="state details-state" role="status">Loading title details...</div>;
  }

  if (error) {
    return <div className="state error details-state" role="alert">Unable to load details: {error}</div>;
  }

  if (!details) {
    return <div className="state details-state">Select a title to explore its details.</div>;
  }

  const startEdit = () => {
    setForm({
      name: details.name || '',
      description: details.description || '',
      type: details.type || 'Anime',
      status: details.status || 'Planned',
      episodes: details.episodes || '',
      score: details.score ?? 0,
      year: details.year || '',
      genre: details.genre || '',
    });
    setEditMode(true);
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    if (actionLoading) return;

    const saved = await onEdit(details.id, {
      ...form,
      name: form.name.trim(),
      score: Number(form.score),
      year: Number(form.year),
    });

    if (saved) setEditMode(false);
  };

  return (
    <article className="details">
      <div className="details-header">
        <div>
          <span className="eyebrow">{details.type} · {details.year}</span>
          <h2>{details.name}</h2>
        </div>
        <span className={`status-badge ${(details.status || '').toLowerCase()}`}>
          {details.status}
        </span>
      </div>

      {editMode ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <label>
            Title
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label>
            Description
            <textarea
              rows="4"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </label>
          <div className="form-grid">
            <label>
              Type
              <select
                value={form.type}
                onChange={(event) => setForm({ ...form, type: event.target.value })}
              >
                <option>Anime</option>
                <option>Manga</option>
              </select>
            </label>
            <label>
              Status
              <select
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value })}
              >
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label>
              Episodes / chapters
              <input
                value={form.episodes}
                onChange={(event) => setForm({ ...form, episodes: event.target.value })}
              />
            </label>
            <label>
              Score (0–10)
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={form.score}
                onChange={(event) => setForm({ ...form, score: event.target.value })}
                required
              />
            </label>
            <label>
              Year
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear() + 5}
                value={form.year}
                onChange={(event) => setForm({ ...form, year: event.target.value })}
                required
              />
            </label>
            <label>
              Genre
              <input
                value={form.genre}
                onChange={(event) => setForm({ ...form, genre: event.target.value })}
              />
            </label>
          </div>
          <div className="edit-actions">
            <button type="submit" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save changes'}
            </button>
            <button type="button" onClick={() => setEditMode(false)} disabled={actionLoading}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="detail-description">{details.description || 'No description provided.'}</p>
          <div className="fields">
            <div className="field">
              <span className="label">Format</span>
              <p>{details.type}</p>
            </div>
            <div className="field">
              <span className="label">Episodes / chapters</span>
              <p>{details.episodes || '—'}</p>
            </div>
            <div className="field">
              <span className="label">Score</span>
              <p>{Number(details.score).toFixed(1)} / 10</p>
            </div>
            <div className="field">
              <span className="label">Year</span>
              <p>{details.year || '—'}</p>
            </div>
            <div className="field">
              <span className="label">Genre</span>
              <p>{details.genre || '—'}</p>
            </div>
          </div>
          <div className="actions">
            <button type="button" onClick={startEdit} disabled={actionLoading}>Edit title</button>
            <label className="status-action">
              Update status
              <select
                value={details.status || 'Planned'}
                onChange={(event) => onChangeStatus(details.id, event.target.value)}
                disabled={actionLoading}
              >
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            {actionLoading && <span className="action-loading">Saving...</span>}
          </div>
        </>
      )}
    </article>
  );
}

export default ItemDetails;
