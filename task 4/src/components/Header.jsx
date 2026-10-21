function Header({ onReload, listLoading }) {
  return (
    <header className="header">
      <div>
        <h1>Anime & Manga Library</h1>
      </div>
      <button onClick={onReload} disabled={listLoading} className="reload-btn">
        {listLoading ? 'Loading...' : 'Reload List'}
      </button>
    </header>
  );
}

export default Header;