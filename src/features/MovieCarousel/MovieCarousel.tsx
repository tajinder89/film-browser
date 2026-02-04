import Carousel from './components/Carousel/Carousel';
import Layout from '../../shared/components/Layout/Layout';
import { useAllMovieLists } from '../../lib/queries';
import './styles/movie-carousel.scss';

const MovieCarousel = () => {
  const {
    data: movies,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllMovieLists();

  const errorMessage = isError ? (error?.message || 'Failed to load movies') : null;

  return (
    <Layout
      loading={isLoading}
      error={errorMessage}
      onRetry={() => {
        refetch();
      }}>
      <main className="app-main" data-testid="carousel-main">
        {movies?.topRated.length! > 0 && (
          <div data-testid="carousel-top-rated">
            <Carousel title="Top Rated" movies={movies!.topRated} source="toprated" />
          </div>
        )}
        {movies?.upcoming.length! > 0 && (
          <div data-testid="carousel-upcoming">
            <Carousel title="Upcoming Movies" movies={movies!.upcoming} source="upcoming" />
          </div>
        )}
        {movies?.nowPlaying.length! > 0 && (
          <div data-testid="carousel-now-playing">
            <Carousel title="Now Playing" movies={movies!.nowPlaying} source="nowplaying" />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default MovieCarousel;
