import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Unitalk.jsx'
import Unitalk from './Unitalk.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Unitalk />
  </StrictMode>,
)