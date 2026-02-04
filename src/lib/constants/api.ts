export const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

export const AUTH_TOKEN = import.meta.env.VITE_TMDB_AUTH_TOKEN || '';

export const IMAGE_SIZES = {
  POSTER: import.meta.env.VITE_IMAGE_SIZE_POSTER || 'w500',
  BACKDROP: import.meta.env.VITE_IMAGE_SIZE_BACKDROP || 'original',
  THUMBNAIL: import.meta.env.VITE_IMAGE_SIZE_THUMBNAIL || 'w342',
} as const;
