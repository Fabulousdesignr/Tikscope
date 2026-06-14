import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely suppress benign, unrequested dev-server websocket rejections stemming from disabled HMR in the cloud sandbox.
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reasonMsg = event.reason?.message || String(event.reason);
    if (
      reasonMsg.includes('WebSocket') || 
      reasonMsg.includes('vite') ||
      reasonMsg.includes('WS')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
