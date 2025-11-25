/** TODO npm install @mui/material @emotion/react @emotion/styled react react-dom @mui/icons-material react-router react-router-dom */
// TODO - make .env with VITE_TMDB_API_KEY=... and import to Netlify
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
