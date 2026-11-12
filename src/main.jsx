import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted fonts: no third-party requests. Browsers download only the subsets
// (unicode ranges) the page actually uses — in practice the Latin files.
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import './styles/index.css';

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
