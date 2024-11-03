import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/appContext.tsx'

const client = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </AppContextProvider>
  </StrictMode>,
)
