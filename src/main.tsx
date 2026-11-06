import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { isBenignError } from './lib/abortUtils';

// Gracefully handle harmless browser AbortErrors, cancellations and Firebase popup lifecycles
if (typeof window !== 'undefined') {
  // Direct error handler
  const origOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (isBenignError(error) || isBenignError(message)) {
      return true; // Suppress browser default error logging
    }
    if (typeof origOnError === 'function') {
      return origOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  // Direct unhandled rejection handler
  const origOnUnhandled = window.onunhandledrejection;
  window.onunhandledrejection = (event: PromiseRejectionEvent) => {
    if (isBenignError(event?.reason) || isBenignError(event)) {
      event.preventDefault();
      return true;
    }
    if (typeof origOnUnhandled === 'function') {
      return (origOnUnhandled as any).call(window, event);
    }
  };

  // Silence unhandled rejections from cancelled requests and popup dismissals
  window.addEventListener('unhandledrejection', (event) => {
    if (isBenignError(event.reason) || isBenignError(event)) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      event.stopPropagation?.();
    }
  }, true);

  // Silence window runtime errors from cancelled requests and internal auth assertions
  window.addEventListener('error', (event) => {
    if (isBenignError(event.error) || isBenignError(event.message) || isBenignError(event)) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      event.stopPropagation?.();
    }
  }, true);

  // Filter out benign abort and assertion messages from console.error/warn
  const origError = console.error;
  console.error = (...args: any[]) => {
    if (args.some(arg => isBenignError(arg)) || isBenignError(args.map(a => String(a?.message || a?.stack || a || '')).join(' '))) {
      return;
    }
    origError.apply(console, args);
  };

  const origWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (args.some(arg => isBenignError(arg)) || isBenignError(args.map(a => String(a?.message || a?.stack || a || '')).join(' '))) {
      return;
    }
    origWarn.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

