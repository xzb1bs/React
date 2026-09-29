import { useState } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import AnimeList from './components/AnimeList';
import './App.css';

const initialList = [
  {
    id: 1,
    title: 'Attack on Titan',
    type: 'Anime',
    episodes: '25 eps',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'One Piece',
    type: 'Anime',
    episodes: '1000+ eps',
    status: 'Watching',
  },
  {
    id: 3,
    title: 'Solo Leveling',
    type: 'Manga',
    episodes: '200 ch',
    status: 'Planned',
  },
];

function App() {
  console.log('App rendered');

  const [items, setItems] = useState(initialList);
  const [filter, setFilter] = useState('All');
  const [nextId, setNextId] = useState(4);

  const addItem = (title, type, episodes) => {
    const newItem = {
      id: nextId,
      title,
      type,
      episodes,
      status: 'Planned',
    };
    setItems([...items, newItem]);
    setNextId(nextId + 1);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const changeStatus = (id, newStatus) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const reverseList = () => {
    setItems([...items].reverse());
  };

  const filteredItems =
    filter === 'All'
      ? items
      : items.filter((item) => item.status === filter);

  return (
    <div className="app">
      <Header />
      <Controls
        filter={filter}
        setFilter={setFilter}
        onAdd={addItem}
        onReverse={reverseList}
      />
      <AnimeList
        items={filteredItems}
        onRemove={removeItem}
        onChangeStatus={changeStatus}
      />
    </div>
  );
}

export default App;