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
    // حل مشكلة Origin Mismatch عبر بناء الرابط بناءً على موقع النافذة الحالي
    // هذا يضمن أن sw.js يتم طلبه من نفس النطاق الذي يعمل عليه التطبيق حالياً
    const swUrl = new URL('sw.js', window.location.href).href;
    
    navigator.serviceWorker.register(swUrl)
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