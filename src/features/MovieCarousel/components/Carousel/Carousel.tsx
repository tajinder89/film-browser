import { useState } from 'react';
import type { CarouselProps } from '../../../../lib/types/movie';
import MovieCard from '../MovieCard/MovieCard';
import '../../styles/carousel.scss';

const Carousel = ({ title, movies, source }: CarouselProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="carousel-section" aria-label={`${title} carousel`} data-testid="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
      </div>
      <div
        className="carousel-container"
        role="region"
        aria-label={`Scrollable ${title} movies list`}
        data-testid="carousel-container"
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isHovered={hoveredId === movie.id}
            index={index}
            onHover={setHoveredId}
            source={source}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
