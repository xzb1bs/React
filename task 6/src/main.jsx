import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './auth/AuthContext.jsx';
import './index.css';
import App from './App.jsx';
import { registerServiceWorker } from './pwa/registerServiceWorker.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

registerServiceWorker();
