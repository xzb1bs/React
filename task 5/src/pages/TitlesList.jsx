import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getItemsList } from '../services/service.js';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import SortControls from '../components/SortControls';
import Pagination from '../components/Pagination';

function TitlesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const type = searchParams.get('type') || '';
  const sort = searchParams.get('sort') || 'name';
  const order = searchParams.get('order') || 'asc';
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '12');

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value == null) next.delete(key);
      else next.set(key, String(value));
    });
    if (!('page' in updates)) next.set('page', '1');
    setSearchParams(next);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        search, status, type, sort, order,
        page: String(page),
        limit: String(limit),
      });
      try {
        const result = await getItemsList(`?${params.toString()}`);
        if (!cancelled) {
          setItems(result.data);
          setMeta({
            total: result.total,
            totalPages: Math.max(1, result.totalPages),
          });
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [search, status, type, sort, order, page, limit]);

  return (
    <section className="page titles-page">
      <div className="page-header">
        <h1>Titles</h1>
        <p className="muted">
          {meta.total} title{meta.total === 1 ? '' : 's'} · filters synced to URL
        </p>
      </div>

      <div className="library-layout">
        <aside className="sidebar tools">
          <SearchBar value={search} onChange={(v) => updateParams({ search: v })} />
          <Filters
            status={status}
            type={type}
            onStatusChange={(v) => updateParams({ status: v })}
            onTypeChange={(v) => updateParams({ type: v })}
          />
          <SortControls
            sort={sort}
            order={order}
            onSortChange={(v) => updateParams({ sort: v })}
            onOrderChange={(v) => updateParams({ order: v })}
          />
        </aside>

        <div className="list-area">
          {loading && <p className="state">Loading titles…</p>}
          {error && <p className="state error" role="alert">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="state empty">No titles match your filters.</p>
          )}
          {!loading && !error && items.length > 0 && (
            <ul className="card-grid">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </ul>
          )}
          <Pagination
            page={page}
            totalPages={meta.totalPages}
            limit={limit}
            onPageChange={(p) => updateParams({ page: p })}
            onLimitChange={(l) => updateParams({ limit: l, page: 1 })}
          />
        </div>
      </div>
    </section>
  );
}

export default TitlesList;