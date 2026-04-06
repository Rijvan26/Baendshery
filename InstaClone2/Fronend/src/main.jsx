import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./feature/shared/style.scss"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
