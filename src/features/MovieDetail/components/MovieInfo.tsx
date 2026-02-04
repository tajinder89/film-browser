import type { Movie } from '@lib/types'

interface MovieInfoProps {
  movie: Movie
}

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="movie-header">
      <h1 className="movie-title" data-testid="movie-title">{movie.title}</h1>
      <div className="movie-meta-info" data-testid="movie-meta-info">
        <div className="meta-item">
          <span className="meta-label">Year</span>
          <span className="meta-value" data-testid="movie-year">{movie.year}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Rating</span>
          <div className="rating-display" data-testid="movie-rating">
            <span className="rating-star">★</span>
            <span>{movie.rating}</span>
          </div>
        </div>
      </div>
      {movie.genres && movie.genres.length > 0 && (
        <div className="movie-genres-header" data-testid="movie-genres">
          <div className="genre-tags">
            {movie.genres.map((genre: string, index: number) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
