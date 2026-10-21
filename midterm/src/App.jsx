import { useEffect, useState } from 'react';
import {
  createItem,
  deleteItem,
  getItem,
  getItemsList,
  updateItem,
} from './fake-api/fakeApi.js';
import CreateForm from './components/CreateForm';
import Filters from './components/Filters';
import Header from './components/Header';
import ItemDetails from './components/ItemDetails';
import ItemList from './components/ItemList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [listMeta, setListMeta] = useState({ total: 0, totalPages: 1 });
  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      setListLoading(true);
      setListError(null);

      const params = new URLSearchParams({
        search,
        status,
        type,
        sort,
        order,
        page: String(page),
        limit: String(limit),
      });

      try {
        const result = await getItemsList(`?${params.toString()}`);
        if (!cancelled) {
          setItems(result.data);
          setListMeta({
            total: result.total,
            totalPages: Math.max(1, result.totalPages),
          });
        }
      } catch (error) {
        if (!cancelled) setListError(error.message);
      } finally {
        if (!cancelled) setListLoading(false);
      }
    }

    loadList();
    return () => {
      cancelled = true;
    };
  }, [search, status, type, sort, order, page, limit, reloadKey]);

  useEffect(() => {
    let cancelled = false;

    if (selectedId === null) {
      return () => {
        cancelled = true;
      };
    }

    async function loadDetails() {
      setDetails(null);
      setDetailsLoading(true);
      setDetailsError(null);

      try {
        const item = await getItem(selectedId);
        if (!cancelled) setDetails(item);
      } catch (error) {
        if (!cancelled) setDetailsError(error.message);
      } finally {
        if (!cancelled) setDetailsLoading(false);
      }
    }

    loadDetails();
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const handleReload = () => {
    setReloadKey((current) => current + 1);
  };

  const handleSelect = (id) => {
    if (id === selectedId) return;
    setSelectedId(id);
    setDetails(null);
    setDetailsLoading(false);
    setDetailsError(null);
    setActionError(null);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleTypeFilter = (value) => {
    setType(value);
    setPage(1);
  };

  const handleCreate = async (formData) => {
    setActionError(null);
    try {
      const created = await createItem({
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        episodes: formData.episodes.trim(),
        genre: formData.genre.trim(),
        score: Number(formData.score),
        year: Number(formData.year),
      });
      setPage(1);
      setDetails(null);
      setDetailsError(null);
      setSelectedId(created.id);
      setReloadKey((current) => current + 1);
      return true;
    } catch (error) {
      setActionError(`Could not add this title: ${error.message}`);
      return false;
    }
  };

  const handleDelete = async (id) => {
    setActionError(null);
    setActionLoading(true);
    try {
      await deleteItem(id);
      setItems((current) => current.filter((item) => item.id !== id));
      setSelectedId((current) => (current === id ? null : current));
      setDetails((current) => (current?.id === id ? null : current));
      if (items.length === 1 && page > 1) setPage((current) => current - 1);
      setReloadKey((current) => current + 1);
    } catch (error) {
      setActionError(`Could not delete this title: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const saveChanges = async (id, changes) => {
    setActionError(null);
    setActionLoading(true);
    try {
      const updated = await updateItem(id, changes);
      setDetails((current) => (current?.id === id ? updated : current));
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, ...updated } : item)),
      );
      setReloadKey((current) => current + 1);
      return true;
    } catch (error) {
      setActionError(`Could not save changes: ${error.message}`);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleChangeStatus = (id, nextStatus) => {
    return saveChanges(id, { status: nextStatus });
  };

  const handleEdit = (id, changes) => {
    return saveChanges(id, changes);
  };

  return (
    <div className="app">
      <Header onReload={handleReload} listLoading={listLoading} />

      <div className="main">
        <aside className="sidebar">
          <CreateForm onCreate={handleCreate} />
          {actionError && (
            <p className="action-error" role="alert">{actionError}</p>
          )}
          <section className="library-tools" aria-label="Search and filter library">
            <SearchBar value={search} onChange={handleSearch} />
            <Filters
              status={status}
              type={type}
              onStatusChange={handleStatusFilter}
              onTypeChange={handleTypeFilter}
            />
            <SortControls
              sort={sort}
              order={order}
              onSortChange={(value) => {
                setSort(value);
                setPage(1);
              }}
              onOrderChange={(value) => {
                setOrder(value);
                setPage(1);
              }}
            />
          </section>
          <ItemList
            items={items}
            loading={listLoading}
            error={listError}
            selectedId={selectedId}
            onSelect={handleSelect}
            onDelete={handleDelete}
            total={listMeta.total}
            actionLoading={actionLoading}
          />
          <Pagination
            page={page}
            totalPages={listMeta.totalPages}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={(nextLimit) => {
              setLimit(nextLimit);
              setPage(1);
            }}
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
