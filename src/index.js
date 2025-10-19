import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './auth/AuthContext';

console.log('index.js: starting mount...');

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error('index.js: #root element not found!');
} else {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  console.log('index.js: mounted App into #root');
}
