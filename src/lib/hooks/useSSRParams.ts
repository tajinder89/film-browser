import { useContext } from 'react'
import { useParams as useRouterParams, useSearchParams as useRouterSearchParams, useNavigate as useRouterNavigate } from 'react-router-dom'
import { SSRContextData } from '../../entry-server'

/**
 * Custom hook that provides useParams functionality that works in both SSR and client contexts.
 * During SSR, returns params from SSRContextData context.
 * On client, falls back to React Router's useParams.
 */
export function useSSRParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
  const ssrContext = useContext(SSRContextData)

  if (ssrContext) {
    return ssrContext.params as T
  }

  return useRouterParams() as T
}

/**
 * Custom hook that provides useSearchParams functionality that works in both SSR and client contexts.
 * During SSR, returns searchParams from SSRContextData context.
 * On client, uses React Router's useSearchParams.
 */
export function useSSRSearchParams(): [URLSearchParams, (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void] {
  const ssrContext = useContext(SSRContextData)

  if (ssrContext) {
    return [ssrContext.searchParams, () => {}]
  }

  return useRouterSearchParams()
}

/**
 * Custom hook that provides useNavigate functionality that works in both SSR and client contexts.
 * During SSR, returns a no-op function (navigation doesn't happen on server).
 * On client, uses React Router's useNavigate.
 */
export function useSSRNavigate(): (to: string, options?: any) => void {
  const ssrContext = useContext(SSRContextData)

  if (ssrContext) {
    return () => {}
  }

  return useRouterNavigate()
}
