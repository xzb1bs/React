import { useState } from 'react';

const emptyForm = {
  name: '',
  description: '',
  type: 'Anime',
  status: 'Planned',
  episodes: '',
  score: '0',
  year: String(new Date().getFullYear()),
  genre: '',
};

function CreateForm({ onCreate }) {
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || saving) return;

    setSaving(true);
    try {
      const created = await onCreate(form);
      if (created) {
        setForm({ ...emptyForm });
        setOpen(false);
      }
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button className="add-btn" onClick={() => setOpen(true)}>
        + Add New Title
      </button>
    );
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Add a title</h3>
      <input
        aria-label="Title"
        placeholder="Title *"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        rows="3"
        aria-label="Description"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option>Anime</option>
        <option>Manga</option>
      </select>
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Planned</option>
        <option>Watching</option>
        <option>Completed</option>
        <option>Dropped</option>
      </select>
      <input
        aria-label="Episodes or chapters"
        placeholder="Episodes / Chapters"
        value={form.episodes}
        onChange={(e) => setForm({ ...form, episodes: e.target.value })}
        required
      />
      <input
        type="number"
        aria-label="Score"
        placeholder="Score"
        min="0"
        max="10"
        step="0.1"
        value={form.score}
        onChange={(e) => setForm({ ...form, score: e.target.value })}
        required
      />
      <input
        type="number"
        aria-label="Year"
        placeholder="Year"
        min="1900"
        max={new Date().getFullYear() + 5}
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        required
      />
      <input
        aria-label="Genres"
        placeholder="Genre"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
        required
      />
      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Creating...' : 'Create'}
        </button>
        <button type="button" onClick={() => setOpen(false)} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateForm;