import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/titles', label: 'Titles' },
  { to: '/dashboard', label: 'Dashboard' },
];

function NavBar() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="app-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu}>
          Anime &amp; Manga Library
        </NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span className="nav-toggle-icon" aria-hidden="true" />
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
        <nav
          className={`nav${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main"
        >
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          {!loading && (user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={closeMenu}
              >
                Profile
              </NavLink>
              <button type="button" className="nav-link nav-button" onClick={() => { closeMenu(); logout(); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                onClick={closeMenu}
              >
                Signup
              </NavLink>
            </>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;