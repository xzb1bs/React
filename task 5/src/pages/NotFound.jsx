import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page not-found-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn primary">Go Home</Link>
    </section>
  );
}

export default NotFound;