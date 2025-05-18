import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import Router from './Router'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
