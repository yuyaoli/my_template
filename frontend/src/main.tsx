import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import './index.css'
import App from './App.tsx'
import {OpenAPI } from "./client"
OpenAPI.BASE = import.meta.env.VITE_API_URL

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
