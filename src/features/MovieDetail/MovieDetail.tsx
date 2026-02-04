import { useMovieDetail } from '@lib/queries';
import { useSSRParams, useSSRSearchParams, useFavorites } from '@lib/hooks';
import { SSRLink } from '@components/SSRLink';
import Layout from '@components/Layout/Layout';
import MoviePoster from '@components/MoviePoster/MoviePoster';
import { MovieInfo, FavoriteButton, MovieDescription, WishlistSection } from './components';
import './styles/movie-detail.scss';
import './styles/carousel-themes.scss';

const MovieDetail = () => {
  const { id } = useSSRParams<{ id: string }>();
  const movieId = id ? parseInt(id) : 0;
  const [searchParams] = useSSRSearchParams();
  const source = (searchParams.get('source') || 'toprated') as 'toprated' | 'upcoming' | 'nowplaying';

  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useMovieDetail(movieId);

  const { isFavorited, toggleFavorite } = useFavorites(movieId, source, movie?.title, movie?.posterPath);

  const errorMessage = !movie && !isLoading && !isError ? 'Movie not found' : (isError ? (error?.message || 'An error occurred') : null);

  return (
    <Layout
      loading={isLoading}
      error={errorMessage}
      onRetry={() => refetch()}>{movie && (
        <div className="movie-detail-container" data-testid="movie-detail-container" data-carousel-source={source}>
          <main className="movie-detail-main" data-testid="movie-detail-main">
            <SSRLink to="/" className="back-button" data-testid="back-button">← Back to Home</SSRLink>

            <div className="movie-detail-content">
              <div className="movie-poster-section">
                <MoviePoster posterPath={movie.posterPath} title={movie.title} />
              </div>

              <div className="movie-info-section">
                <MovieInfo movie={movie} />
                <FavoriteButton isFavorited={isFavorited} onToggle={toggleFavorite} />
                <MovieDescription description={movie.description} />
              </div>
            </div>

            <WishlistSection />
          </main>
        </div>
      )}
    </Layout>
  );
};

export default MovieDetail;
