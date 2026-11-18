import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useAuth } from '../auth/useAuth';
import PwaStatus from './PwaStatus';

function RootLayout() {
  const { authError, clearAuthError } = useAuth();

  return (
    <div className="app">
      <NavBar />
      <PwaStatus />
      {authError && (
        <div className="auth-error" role="alert">
          <span>{authError}</span>
          <button type="button" onClick={clearAuthError} aria-label="Dismiss error">
            ×
          </button>
        </div>
      )}
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