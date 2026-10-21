import { useState } from 'react';

function ItemDetails({
  details,
  loading,
  error,
  actionLoading,
  // onChangeStatus,
  onEdit,
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  if (!details && !loading && !error) {
    return <div className="state">Select an item to see details</div>;
  }

  if (loading) {
    return <div className="state">Loading details...</div>;
  }

  if (error) {
    return <div className="state error">Error: {error}</div>;
  }

  if (!details) return null;

  const startEdit = () => {
    setForm({
      name: details.name || '',
      description: details.description || '',
      type: details.type || 'Anime',
      status: details.status || 'Planned',
      episodes: details.episodes || '',
      score: details.score || 0,
      year: details.year || '',
      genre: details.genre || '',
    });
    setEditMode(true);
  };

  const saveEdit = async () => {
    const saved = await onEdit({
      ...form,
      score: Number(form.score) || 0,
      year: Number(form.year) || 0,
    });

    if (saved) {
      setEditMode(false);
    }
  };

  return (
    <div className="details">
      <div className="details-header">
        <h2>{details.name}</h2>
        <span className={`status-badge ${(details.status || '').toLowerCase()}`}>
          {details.status || '—'}
        </span>
      </div>

      {editMode ? (
        <div className="edit-form">
          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          <label>
            Type
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Anime</option>
              <option>Manga</option>
            </select>
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Planned</option>
              <option>Watching</option>
              <option>Completed</option>
              <option>Dropped</option>
            </select>
          </label>
          <label>
            Episodes / Chapters
            <input
              value={form.episodes}
              onChange={(e) => setForm({ ...form, episodes: e.target.value })}
            />
          </label>
          <label>
            Score (0-10)
            <input
              type="number"
              min="0"
              max="10"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
            />
          </label>
          <label>
            Year
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </label>
          <label>
            Genre
            <input
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
            />
          </label>

          <div className="edit-actions">
            <button onClick={saveEdit} disabled={actionLoading}>
              Save
            </button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="fields">
            <div className="field">
              <span className="label">Description</span>
              <p>{details.description || '—'}</p>
            </div>
            <div className="field">
              <span className="label">Type</span>
              <p>{details.type || '—'}</p>
            </div>
            <div className="field">
              <span className="label">Status</span>
              <p>{details.status || '—'}</p>
            </div>
            <div className="field">
              <span className="label">Episodes / Chapters</span>
              <p>{details.episodes || '—'}</p>
            </div>
            <div className="field">
              <span className="label">Score</span>
              <p>{details.score ?? '—'} / 10</p>
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
            <button onClick={startEdit} disabled={actionLoading}>
              Edit
            </button>

            {/* <select
              value={details.status || 'Planned'}
              onChange={(e) => onChangeStatus(e.target.value)}
              disabled={actionLoading}
            >
              <option value="Planned">Planned</option>
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select> */}

            {actionLoading && <span className="action-loading">Updating...</span>}
          </div>
        </>
      )}
    </div>
  );
}

export default ItemDetails;