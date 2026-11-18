function About() {
  return (
    <section className="page about-page">
      <h1>About this project</h1>
      <p>
        This application is a React homework focused on routing and application
        architecture. It extends an earlier Anime &amp; Manga Library catalog
        with React Router, nested routes, URL-driven filters, lazy-loaded
        pages, and a dashboard of live statistics.
      </p>
      <h2>What you can do</h2>
      <ul>
        <li>Browse and search titles with filters synchronized to the URL</li>
        <li>Open any title by ID and view full details</li>
        <li>See aggregate statistics on the dashboard</li>
        <li>Navigate without full page reloads; direct links and back/forward work</li>
      </ul>
      <h2>Tech</h2>
      <p>
        React 19 · Vite · React Router · localStorage-backed fake API with
        search, filter, sort, and pagination.
      </p>
    </section>
  );
}

export default About;