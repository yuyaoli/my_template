import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useAuthStore } from '@/store/auth-store'
import { AppProviders } from '@/components/AppProviders'
import './index.css'
import App from './App.tsx'
import { client } from './client/client.gen'
import { createConfig } from './client/client'

// 配置客户端基础URL
client.setConfig(createConfig({
  auth: () => useAuthStore.getState().token ?? undefined,
  baseUrl: import.meta.env.VITE_API_URL
}))


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
