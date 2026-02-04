import {
  API_BASE_URL,
  AUTH_TOKEN,
  IMAGE_BASE_URL,
  IMAGE_SIZES,
} from '../constants/api';
import type {
  MovieData,
  MovieDetailData,
  ListResponse,
} from '../types/api';

const getFetchOptions = () => ({
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

const fetchMovies = async (endpoint: string): Promise<MovieData[]> => {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    getFetchOptions()
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movies from ${endpoint}: ${response.statusText}`);
  }

  const data: ListResponse = await response.json();
  return data.results;
};

export const fetchTopRated = async (): Promise<MovieData[]> => {
  return fetchMovies('/movie/top_rated');
};

export const fetchUpcoming = async (): Promise<MovieData[]> => {
  return fetchMovies('/movie/upcoming');
};

export const fetchNowPlaying = async (): Promise<MovieData[]> => {
  return fetchMovies('/movie/now_playing');
};

export const fetchMovieDetail = async (
  movieId: number
): Promise<MovieDetailData> => {
  const response = await fetch(
    `${API_BASE_URL}/movie/${movieId}?append_to_response=credits`,
    getFetchOptions()
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movie details for ID ${movieId}: ${response.statusText}`
    );
  }

  const data: MovieDetailData = await response.json();
  return data;
};

export const getImageUrl = (
  path: string | null,
  size: 'POSTER' | 'BACKDROP' | 'THUMBNAIL' = 'POSTER'
): string => {
  if (!path) {
    return '/placeholder-movie.png';
  }

  const sizeMap = {
    POSTER: IMAGE_SIZES.POSTER,
    BACKDROP: IMAGE_SIZES.BACKDROP,
    THUMBNAIL: IMAGE_SIZES.THUMBNAIL,
  };

  return `${IMAGE_BASE_URL}/${sizeMap[size]}${path}`;
};
