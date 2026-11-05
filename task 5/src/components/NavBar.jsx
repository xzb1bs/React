import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/titles', label: 'Titles' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
];

function NavBar() {
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
        </nav>
      </div>
    </header>
  );
}

export default NavBar;