export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

  const hadController = Boolean(navigator.serviceWorker.controller)
  let reloading = false

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController && !reloading) {
      reloading = true
      window.location.reload()
    }
  })

  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
    scope: import.meta.env.BASE_URL,
  }).then((registration) => {
    const notifyUpdate = () => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        window.dispatchEvent(new Event('pwa-update-available'))
      }
    }

    notifyUpdate()
    registration.addEventListener('updatefound', () => {
      const installing = registration.installing
      if (!installing) return

      installing.addEventListener('statechange', () => {
        if (installing.state === 'installed') notifyUpdate()
      })
    })
  }).catch((error) => {
    console.error('Service worker registration failed.', error)
  })
}
