import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// تم تعطيل تسجيل Service Worker هنا لمنع حدوث خطأ SecurityError الناتج عن اختلاف النطاقات (Origin Mismatch)
// في بيئات العرض المؤقتة، مما يضمن عمل التطبيق بسلاسة.

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);