import type { Movie } from '../types/movie';
import type { MovieData, MovieDetailData } from '../types/api';

const formatRuntime = (runtime: number | undefined): string => {
  if (!runtime) return 'N/A';

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
};

const formatRating = (voteAverage: number): string => {
  return voteAverage.toFixed(1);
};

const extractDirector = (crew?: { job: string; name: string }[]): string => {
  if (!crew) return 'Unknown';

  const director = crew.find((member) => member.job === 'Director');
  return director?.name || 'Unknown';
};

const extractCast = (cast?: { name: string }[], limit: number = 5): string[] => {
  if (!cast) return [];

  return cast.slice(0, limit).map((member) => member.name);
};

const extractGenreNames = (genres?: { name: string }[]): string[] => {
  if (!genres) return [];

  return genres.map((genre) => genre.name);
};

const mapCommonFields = (
  id: number,
  title: string,
  releaseDate: string,
  voteAverage: number,
  overview: string,
  posterPath: string | null,
  backdropPath: string | null,
): Partial<Movie> => ({
  id,
  title,
  year: new Date(releaseDate).getFullYear().toString(),
  rating: formatRating(voteAverage),
  description: overview,
  releaseDate,
  posterPath: posterPath || undefined,
  backdropPath: backdropPath || undefined,
});

export const mapMovie = (movieData: MovieData): Movie => {
  return {
    ...mapCommonFields(
      movieData.id,
      movieData.title,
      movieData.release_date,
      movieData.vote_average,
      movieData.overview,
      movieData.poster_path,
      movieData.backdrop_path
    ),
  } as Movie;
};

export const mapMovieDetail = (movieDetailData: MovieDetailData): Movie => {
  return {
    ...mapCommonFields(
      movieDetailData.id,
      movieDetailData.title,
      movieDetailData.release_date,
      movieDetailData.vote_average,
      movieDetailData.overview,
      movieDetailData.poster_path,
      movieDetailData.backdrop_path
    ),
    duration: formatRuntime(movieDetailData.runtime),
    director: extractDirector(movieDetailData.credits?.crew),
    cast: extractCast(movieDetailData.credits?.cast),
    genres: extractGenreNames(movieDetailData.genres),
  } as Movie;
};
