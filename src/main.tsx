import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './app';

const container = document.getElementById('root');
if (!container) throw new Error('#root element missing');

// If prerendered markup is present, hydrate it; otherwise do a client render
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
