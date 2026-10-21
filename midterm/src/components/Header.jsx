function Header({ onReload, listLoading }) {
  return (
    <header className="header">
      <div>
        <h1>Anime & Manga Library</h1>
        <p>Discover a story, keep track of your next favorite.</p>
      </div>
      <button onClick={onReload} disabled={listLoading} className="reload-btn">
        {listLoading ? 'Loading...' : 'Reload List'}
      </button>
    </header>
  );
}

export default Header;