import { getImageUrl } from '../../../lib/api/movie';
import './movie-poster.scss';

interface MoviePosterProps {
  posterPath?: string;
  title: string;
  size?: 'POSTER' | 'BACKDROP' | 'THUMBNAIL';
}

const MoviePoster = ({ posterPath, title, size = 'POSTER' }: MoviePosterProps) => {
  return (
    <figure className="movie-poster" data-testid="movie-poster">
      {posterPath ? (
        <img
          src={getImageUrl(posterPath, size)}
          alt={`${title} movie poster`}
          data-testid="movie-poster-image"
        />
      ) : (
        <div
          aria-label={`${title} poster placeholder`}
          data-testid="movie-poster-placeholder"
        >
          {title.charAt(0)}
        </div>
      )}
    </figure>
  );
};

export default MoviePoster;
