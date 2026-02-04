import type { Movie } from '../../../../lib/types/movie';
import { useSSRNavigate } from '../../../../lib/hooks/useSSRParams';
import MoviePoster from '../../../../shared/components/MoviePoster/MoviePoster';
import '../../styles/movie-card.scss';

interface MovieCardProps {
  movie: Movie;
  isHovered: boolean;
  index: number;
  onHover: (id: number | null) => void;
  source: 'toprated' | 'upcoming' | 'nowplaying';
}

const MovieCard = ({ movie, isHovered, index, onHover, source }: MovieCardProps) => {
  const navigate = useSSRNavigate();

  const handleNavigate = () => {
    navigate(`/movie/${movie.id}?source=${source}`);
  };

  return (
    <article
      className={`movie-card ${isHovered ? 'movie-card--hovered' : ''}`}
      data-testid={`movie-card-${movie.id}`}
      style={{
        '--card-animation-delay': `${index * 0.1}s`,
      } as React.CSSProperties}
      onMouseEnter={() => onHover(movie.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleNavigate();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${movie.title} (${movie.year}) - Rating: ${movie.rating}/10`}
    >
      <MoviePoster posterPath={movie.posterPath} title={movie.title} />
      <div className="movie-info">
        <div className="movie-rating">
          <span className="stars">★</span>
          <span className="rating-value" data-testid="movie-rating">{parseFloat(movie.rating).toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
