import { useEffect, useState } from 'react'

function PwaStatus() {
  const [online, setOnline] = useState(navigator.onLine)
  const [updateReady, setUpdateReady] = useState(false)
  const [updateError, setUpdateError] = useState('')

  useEffect(() => {
    const updateConnection = () => setOnline(navigator.onLine)
    const announceUpdate = () => setUpdateReady(true)

    window.addEventListener('online', updateConnection)
    window.addEventListener('offline', updateConnection)
    window.addEventListener('pwa-update-available', announceUpdate)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting && navigator.serviceWorker.controller) {
          setUpdateReady(true)
        }
      }).catch((error) => {
        console.error('Could not inspect the service worker registration.', error)
      })
    }

    return () => {
      window.removeEventListener('online', updateConnection)
      window.removeEventListener('offline', updateConnection)
      window.removeEventListener('pwa-update-available', announceUpdate)
    }
  }, [])

  async function activateUpdate() {
    setUpdateError('')
    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (!registration?.waiting) {
        throw new Error('The update is no longer waiting. Reload the page to check again.')
      }
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    } catch (error) {
      console.error('Could not activate the service worker update.', error)
      setUpdateError(error.message)
    }
  }

  return (
    <div className="pwa-status">
      <p className={`connection-status ${online ? 'online' : 'offline'}`} role="status">
        <span className="connection-dot" aria-hidden="true" />
        {online ? 'Online' : 'Offline — saved catalog data is available'}
      </p>
      {updateReady && (
        <div className="update-notice" role="status">
          <span>A new version is ready.</span>
          <button type="button" className="btn primary" onClick={activateUpdate}>
            Update now
          </button>
        </div>
      )}
      {updateError && <p className="update-error" role="alert">{updateError}</p>}
    </div>
  )
}

export default PwaStatus
