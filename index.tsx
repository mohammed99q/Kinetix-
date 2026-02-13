import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Service Worker Registration for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Registering sw.js with root scope to ensure full control
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('Kinetix Pro SW registered: ', registration.scope);
      })
      .catch(err => {
        console.error('Kinetix Pro SW registration failed: ', err);
      });
  });
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);