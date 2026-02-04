export interface Movie {
  id: number;
  title: string;
  year: string;
  rating: string;
  description?: string;
  duration?: string;
  releaseDate?: string;
  cast?: string[];
  director?: string;
  genres?: string[];
  posterPath?: string;
  backdropPath?: string;
}

export interface CarouselProps {
  title: string;
  movies: Movie[];
  source: 'toprated' | 'upcoming' | 'nowplaying';
}
