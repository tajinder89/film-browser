import { QueryClient } from '@tanstack/react-query'
import { matchRoutes } from 'react-router-dom'
import { routes } from '../../routes'
import {
  fetchTopRated,
  fetchUpcoming,
  fetchNowPlaying,
  fetchMovieDetail,
} from '../api/movie'
import { mapMovie, mapMovieDetail } from '../utils/mapper'

/**
 * Prefetch data based on the current URL route.
 * This is called on the server before rendering to ensure data is available.
 */
export async function prefetchRouteData(
  url: string,
  queryClient: QueryClient,
): Promise<void> {
  const pathname = new URL(url, 'http://localhost').pathname

  const matches = matchRoutes(routes, pathname)

  if (!matches || matches.length === 0) {
    return
  }

  const match = matches[0]

  try {
    if (match.route.path === '/') {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: ['top_rated', 'list'],
          queryFn: async () => {
            const data = await fetchTopRated()
            return data.map(mapMovie)
          },
        }),
        queryClient.prefetchQuery({
          queryKey: ['upcoming', 'list'],
          queryFn: async () => {
            const data = await fetchUpcoming()
            return data.map(mapMovie)
          },
        }),
        queryClient.prefetchQuery({
          queryKey: ['now_playing', 'list'],
          queryFn: async () => {
            const data = await fetchNowPlaying()
            return data.map(mapMovie)
          },
        }),
      ])
    }
    else if (match.route.path === '/movie/:id') {
      const movieId = match.params.id

      if (movieId && !isNaN(Number(movieId))) {
        await queryClient.prefetchQuery({
          queryKey: ['movie', Number(movieId)],
          queryFn: async () => {
            const data = await fetchMovieDetail(Number(movieId))
            return mapMovieDetail(data)
          },
        })
      }
    }
  } catch {
    // Silently ignore prefetch errors to prevent server render failures
    // Stale data or client-side refetch will handle missing data
  }
}
