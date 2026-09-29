import { useState } from 'react';

function Controls({ filter, setFilter, onAdd, onReverse }) {
  console.log('Controls rendered');

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Anime');
  const [episodes, setEpisodes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title, type, episodes || '—');
    setTitle('');
    setEpisodes('');
    setType('Anime');
  };

  return (
    <div className="controls">
      <div className="filters">
        {['All', 'Planned', 'Watching', 'Completed', 'Dropped'].map((status) => (
          <button
            key={status}
            className={filter === status ? 'active' : ''}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
        <button onClick={onReverse} className="reverse-btn">
          Reverse List
        </button>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Anime">Anime</option>
          <option value="Manga">Manga</option>
        </select>
        <input
          type="text"
          placeholder="Episodes / Chapters"
          value={episodes}
          onChange={(e) => setEpisodes(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Controls;