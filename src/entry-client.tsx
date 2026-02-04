import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, hydrate as hydrateQuery } from '@tanstack/react-query'
import App from './app/App'
import { SSRContextData } from './entry-server'
import { initializeWishlist, setupWishlistPersistence } from './store/store'
import './index.scss'
import './styles/global.scss'

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: unknown
    markAppHydrated?: () => void
  }
}

const getQueryConfig = () => {
  const staleTime = parseInt(import.meta.env.VITE_QUERY_STALE_TIME || '300000', 10)
  const gcTime = parseInt(import.meta.env.VITE_QUERY_GC_TIME || '600000', 10)
  const retry = parseInt(import.meta.env.VITE_QUERY_RETRY_CLIENT || '2', 10)

  return {
    staleTime,
    gcTime,
    retry,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: getQueryConfig(),
  },
})

if (window.__REACT_QUERY_STATE__) {
  hydrateQuery(queryClient, window.__REACT_QUERY_STATE__)
}

initializeWishlist()
setupWishlistPersistence()

const container = document.getElementById('app')
if (!container) throw new Error('Root element with id "app" not found')

hydrateRoot(
  container,
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SSRContextData.Provider value={null}>
        <App />
      </SSRContextData.Provider>
    </BrowserRouter>
  </QueryClientProvider>,
)

setTimeout(() => {
  if (window.markAppHydrated) {
    window.markAppHydrated();
  }
}, 0);

window.addEventListener('load', () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto';
  }
  const scrollX = sessionStorage.getItem('scrollX');
  const scrollY = sessionStorage.getItem('scrollY');
  if (scrollX !== null && scrollY !== null) {
    window.scrollTo(parseInt(scrollX, 10), parseInt(scrollY, 10));
  }
});

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollX', window.scrollX.toString());
  sessionStorage.setItem('scrollY', window.scrollY.toString());
});
