import { useState } from 'react';

function CreateForm({ onCreate }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: 'Anime',
    status: 'Planned',
    episodes: '',
    score: 0,
    year: 2024,
    genre: '',
  });
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || saving) return;

    setSaving(true);
    const created = await onCreate(form);
    setSaving(false);

    if (!created) return;

    setForm({
      name: '',
      description: '',
      type: 'Anime',
      status: 'Planned',
      episodes: '',
      score: 0,
      year: 2024,
      genre: '',
    });
    setOpen(false);
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
      <h3>Add New</h3>
      <input
        placeholder="Title *"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
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
        placeholder="Episodes / Chapters"
        value={form.episodes}
        onChange={(e) => setForm({ ...form, episodes: e.target.value })}
      />
      <input
        type="number"
        placeholder="Score"
        min="0"
        max="10"
        value={form.score}
        onChange={(e) => setForm({ ...form, score: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />
      <input
        placeholder="Genre"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
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