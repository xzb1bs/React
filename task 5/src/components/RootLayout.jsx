import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function RootLayout() {
  return (
    <div className="app">
      <NavBar />
      <main className="page-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>Anime &amp; Manga Library · React Router homework</p>
      </footer>
    </div>
  );
}

export default RootLayout;