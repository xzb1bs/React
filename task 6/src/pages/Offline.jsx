import { Link } from 'react-router-dom'

function Offline() {
  function retryConnection() {
    if (navigator.onLine) {
      window.location.reload()
    } else {
      window.location.assign('/offline.html')
    }
  }

  return (
    <section className="page offline-page">
      <h1>You’re offline</h1>
      <p>
        Your connection is unavailable. Previously saved catalog data and
        visited pages remain available on this device.
      </p>
      <div className="offline-actions">
        <button type="button" className="btn primary" onClick={retryConnection}>
          Retry connection
        </button>
        <Link to="/titles" className="btn secondary">Open saved titles</Link>
      </div>
    </section>
  )
}

export default Offline
