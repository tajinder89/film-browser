import { useQueries, type UseQueryResult } from '@tanstack/react-query';
import {
  fetchTopRated,
  fetchUpcoming,
  fetchNowPlaying,
} from '../api/movie';
import { mapMovie } from '../utils/mapper';

/**
 * Combined hook that fetches all three movie lists in parallel.
 * Uses useQueries to maintain parallel fetching behavior.
 *
 * Returns:
 * - data: { topRated: any[], upcoming: any[], nowPlaying: any[] } | undefined
 * - isLoading: boolean
 * - isError: boolean
 * - error: Error | null
 */
export function useAllMovieLists() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['top_rated', 'list'],
        queryFn: async () => {
          const data = await fetchTopRated();
          return data.map(mapMovie);
        },
      },
      {
        queryKey: ['upcoming', 'list'],
        queryFn: async () => {
          const data = await fetchUpcoming();
          return data.map(mapMovie);
        },
      },
      {
        queryKey: ['now_playing', 'list'],
        queryFn: async () => {
          const data = await fetchNowPlaying();
          return data.map(mapMovie);
        },
      },
    ],
  }) as UseQueryResult<any[], Error>[];

  const topRatedQuery = queries[0];
  const upcomingQuery = queries[1];
  const nowPlayingQuery = queries[2];

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.error)?.error ?? null;

  const data =
    topRatedQuery.data && upcomingQuery.data && nowPlayingQuery.data
      ? {
        topRated: topRatedQuery.data,
        upcoming: upcomingQuery.data,
        nowPlaying: nowPlayingQuery.data,
      }
      : undefined;

  return {
    data,
    isLoading,
    isError,
    error: error instanceof Error ? error : null,
    refetch: () => {
      topRatedQuery.refetch();
      upcomingQuery.refetch();
      nowPlayingQuery.refetch();
    },
  };
}
