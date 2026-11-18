import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/titles', label: 'Titles' },
  { to: '/dashboard', label: 'Dashboard' },
];

function NavBar() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          Anime &amp; Manga Library
        </NavLink>
        <nav className="nav" aria-label="Main">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
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
              >
                Profile
              </NavLink>
              <button type="button" className="nav-link nav-button" onClick={logout}>
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
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
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