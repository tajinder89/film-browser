import { createContext } from 'react'
import { renderToString } from 'react-dom/server'
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query'
import { StaticRouter } from 'react-router-dom'
import { prefetchRouteData } from './lib/ssr/prefetch'
import { matchRoutes } from 'react-router-dom'
import { routes } from './routes'
import App from './app/App'

export const SSRContextData = createContext<{
  params: Record<string, string>
  pathname: string
  searchParams: URLSearchParams
} | null>(null)

const getQueryConfig = () => {
  const staleTime = parseInt(import.meta.env.VITE_QUERY_STALE_TIME || '300000', 10)
  const gcTime = parseInt(import.meta.env.VITE_QUERY_GC_TIME || '600000', 10)
  const retry = parseInt(import.meta.env.VITE_QUERY_RETRY_SERVER || '1', 10)

  return {
    staleTime,
    gcTime,
    retry,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  }
}

/**
 * Server-side render function for SSR.
 * Called by the Express server with the request URL.
 * Returns the rendered HTML string and dehydrated React Query state.
 */
export async function render(url: string): Promise<{
  html: string
  state: unknown
}> {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: getQueryConfig(),
    },
  })

  const urlObj = new URL(url, 'http://localhost')
  const pathname = urlObj.pathname

  const matches = matchRoutes(routes, pathname)

  await prefetchRouteData(url, queryClient)

  const params = (matches?.[0]?.params as Record<string, string>) || {}
  const searchParams = new URLSearchParams(urlObj.search)

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={pathname}>
        <SSRContextData.Provider value={{ params, pathname, searchParams }}>
          <App />
        </SSRContextData.Provider>
      </StaticRouter>
    </QueryClientProvider>,
  )

  const state = dehydrate(queryClient)

  return { html, state }
}
