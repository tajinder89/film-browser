import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from '../api/movie';
import { mapMovieDetail } from '../utils/mapper';

/**
 * Hook to fetch detailed information about a specific movie.
 *
 * @param movieId - The TMDB movie ID
 *
 * Returns:
 * - data: Mapped movie detail object | undefined
 * - isLoading: boolean
 * - isError: boolean
 * - error: Error | null
 * - refetch: () => Promise
 */
export function useMovieDetail(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const data = await fetchMovieDetail(movieId);
      return mapMovieDetail(data);
    },
    enabled: movieId > 0,
  });
}
