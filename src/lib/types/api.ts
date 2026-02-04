export interface MovieData {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetailData {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: GenreData[];
  credits?: {
    cast: CastMemberData[];
    crew: CrewMemberData[];
  };
}

export interface GenreData {
  id: number;
  name: string;
}

export interface CastMemberData {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMemberData {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface ListResponse {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}
