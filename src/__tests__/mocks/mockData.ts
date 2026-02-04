import type { MovieData, MovieDetailData } from '@/lib/types/api';
import type { Movie } from '@/lib/types/movie';

export const mockMovie: MovieData = {
  id: 278,
  title: 'The Shawshank Redemption',
  overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  release_date: '1994-09-23',
  vote_average: 9.3,
  poster_path: '/q6y0Go1tsGEsmtFryDOJo12dysJ.jpg',
  backdrop_path: '/A6msuPkWLHzJ3gDVFkaC73HwrZh.jpg',
  genre_ids: [18, 80],
};

export const mockMovieDetail: MovieDetailData = {
  id: 278,
  title: 'The Shawshank Redemption',
  overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  release_date: '1994-09-23',
  vote_average: 9.3,
  poster_path: '/q6y0Go1tsGEsmtFryDOJo12dysJ.jpg',
  backdrop_path: '/A6msuPkWLHzJ3gDVFkaC73HwrZh.jpg',
  runtime: 142,
  genres: [
    { id: 18, name: 'Drama' },
    { id: 80, name: 'Crime' },
  ],
  credits: {
    cast: [
      {
        id: 3,
        name: 'Tim Robbins',
        character: 'Andy Dufresne',
        profile_path: '/8Uwmq7bKBKf8Ze9MdqJTHwdMPPk.jpg',
        order: 0
      },
      {
        id: 5,
        name: 'Morgan Freeman',
        character: 'Ellis Boyd "Red" Redding',
        profile_path: '/jPMivMXontG7BYQ4bCFWV2xomMZ.jpg',
        order: 0
      },
    ],
    crew: [
      {
        id: 15,
        name: 'Frank Darabont',
        job: 'Director',
        department: 'Directing',
        profile_path: '/dTKwOWaQZsXXR6Yd8tLvtTxVcSx.jpg',
      },
    ],
  },
};

export const mockMappedMovie: Movie = {
  id: mockMovie.id,
  title: mockMovie.title,
  year: '1994',
  rating: '9.3',
  description: mockMovie.overview,
  posterPath: mockMovie.poster_path || undefined,
  backdropPath: mockMovie.backdrop_path || undefined,
  releaseDate: mockMovie.release_date,
};

export const mockMappedMovieDetail: Movie = {
  id: mockMovieDetail.id,
  title: mockMovieDetail.title,
  year: '1994',
  rating: '9.3',
  duration: '2h 22m',
  director: 'Frank Darabont',
  description: mockMovieDetail.overview,
  genres: ['Drama', 'Crime'],
  cast: ['Tim Robbins', 'Morgan Freeman'],
  posterPath: mockMovieDetail.poster_path || undefined,
  backdropPath: mockMovieDetail.backdrop_path || undefined,
  releaseDate: mockMovieDetail.release_date,
};

export const mockMovieList = [
  mockMappedMovie,
  { ...mockMappedMovie, id: 279, title: 'The Dark Knight' },
  { ...mockMappedMovie, id: 280, title: 'Inception' },
];
