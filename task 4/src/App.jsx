import { useState, useEffect } from 'react';
import { getItemsList, getItem, createItem, updateItem, deleteItem } from './fake-api/fakeApi.js';
import Header from './components/Header';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import CreateForm from './components/CreateForm';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);


  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      setListLoading(true);
      setListError(null);

      try {
        const result = await getItemsList('?limit=50');
        if (!cancelled) {
          setItems(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setListError(err.message);
        }
      } finally {
        if (!cancelled) {
          setListLoading(false);
        }
      }
    }

    loadList();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);


  useEffect(() => {
    if (selectedId === null) {
      return;
    }

    let cancelled = false;

    async function loadDetails() {
      setDetailsLoading(true);
      setDetailsError(null);
      setDetails(null);

      try {
        const item = await getItem(selectedId);
        if (!cancelled) {
          setDetails(item);
        }
      } catch (err) {
        if (!cancelled) {
          setDetailsError(err.message);
        }
      } finally {
        if (!cancelled) {
          setDetailsLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const handleReload = () => {
    setReloadKey((k) => k + 1);
    setSelectedId(null);
    setDetails(null);
    setDetailsError(null);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    setDetails(null);
    setDetailsError(null);
  };

  const handleCreate = async (formData) => {
    try {
      await createItem({
        name: formData.name,
        description: formData.description,
        type: formData.type,
        status: formData.status,
        episodes: formData.episodes,
        score: Number(formData.score) || 0,
        year: Number(formData.year) || 2024,
        genre: formData.genre,
      });

      setReloadKey((k) => k + 1);
      return true;
    } catch (err) {
      alert('Create failed: ' + err.message);
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setSelectedId((currentId) => (currentId === id ? null : currentId));
      setDetails((currentDetails) =>
        currentDetails?.id === id ? null : currentDetails
      );
      setReloadKey((k) => k + 1);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const saveChanges = async (changes, errorMessage) => {
    if (selectedId === null) return false;
    const id = selectedId;
    setActionLoading(true);

    try {
      const updated = await updateItem(id, changes);
      setDetails((currentDetails) =>
        currentDetails?.id === id ? updated : currentDetails
      );

      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
      );
      return true;
    } catch (err) {
      alert(errorMessage + ': ' + err.message);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleChangeStatus = (newStatus) => {
    return saveChanges({ status: newStatus }, 'Update failed');
  };

  const handleEdit = (changes) => {
    return saveChanges(changes, 'Edit failed');
  };

  return (
    <div className="app">
      <Header onReload={handleReload} listLoading={listLoading} />

      <div className="main">
        <aside className="sidebar">
          <CreateForm onCreate={handleCreate} />

          <ItemList
            items={items}
            loading={listLoading}
            error={listError}
            selectedId={selectedId}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </aside>

        <main className="content">
          <ItemDetails
            key={selectedId}
            details={details}
            loading={selectedId !== null && detailsLoading}
            error={selectedId === null ? null : detailsError}
            actionLoading={actionLoading}
            onChangeStatus={handleChangeStatus}
            onEdit={handleEdit}
          />
        </main>
      </div>
    </div>
  );
}

export default App;