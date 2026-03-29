import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const currentPath = window.location.pathname || '/';
if (currentPath === '/piWeb' || currentPath.startsWith('/piWeb/')) {
  const normalizedPath = currentPath.replace(/^\/piWeb/, '') || '/';
  const normalizedUrl = `${normalizedPath}${window.location.search || ''}${window.location.hash || ''}`;
  window.history.replaceState({}, document.title, normalizedUrl);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
