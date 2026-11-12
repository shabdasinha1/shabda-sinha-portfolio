import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted fonts: no third-party requests. Browsers download only the subsets
// (unicode ranges) the page actually uses — in practice the Latin files.
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
// The serif is only ever used in italic (accent words), and only for Latin text.
import '@fontsource/instrument-serif/latin-400-italic.css';
import './styles/index.css';

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
