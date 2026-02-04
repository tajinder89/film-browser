import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from '../MovieCard';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { mockMappedMovie } from '@/__tests__/mocks/mockData';

vi.mock('@/lib/hooks/useSSRParams', () => ({
  useSSRNavigate: () => vi.fn(),
}));

describe('MovieCard', () => {
  const defaultProps = {
    movie: mockMappedMovie,
    source: 'toprated' as const,
    isHovered: false,
    index: 0,
    onHover: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render movie card with correct test id', () => {
      renderWithProviders(<MovieCard {...defaultProps} />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);
      expect(card).toBeInTheDocument();
    });

    it('should display movie poster image', () => {
      renderWithProviders(<MovieCard {...defaultProps} />);
      const poster = screen.getByTestId('movie-poster');
      expect(poster).toBeInTheDocument();
    });

    it('should display movie rating', () => {
      renderWithProviders(<MovieCard {...defaultProps} />);
      const rating = screen.getByTestId('movie-rating');
      expect(rating).toBeInTheDocument();
      expect(rating).toHaveTextContent('9.3');
    });

    it('should render with correct CSS classes', () => {
      renderWithProviders(<MovieCard {...defaultProps} />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);
      expect(card).toHaveClass('movie-card');
    });

    it('should handle missing poster path gracefully', () => {
      const movieWithoutPoster = { ...mockMappedMovie, posterPath: undefined };
      renderWithProviders(<MovieCard {...defaultProps} movie={movieWithoutPoster} />);
      const poster = screen.getByTestId('movie-poster');
      expect(poster).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should be clickable', async () => {
      renderWithProviders(<MovieCard {...defaultProps} />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);

      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabindex', '0');
    });

    it('should have hover effect', async () => {
      const onHover = vi.fn();
      renderWithProviders(<MovieCard {...defaultProps} onHover={onHover} />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);

      fireEvent.mouseEnter(card);
      expect(onHover).toHaveBeenCalledWith(mockMappedMovie.id);

      fireEvent.mouseLeave(card);
      expect(onHover).toHaveBeenCalledWith(null);
    });

    it('should support keyboard navigation', async () => {
      renderWithProviders(<MovieCard {...defaultProps} />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);

      expect(card).toHaveAttribute('tabindex', '0');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderWithProviders(<MovieCard {...defaultProps} />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);

      expect(card).toHaveAttribute('role');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MovieCard {...defaultProps} />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);

      await user.tab();
      expect(card).toHaveFocus();
    });
  });

  describe('Different sources', () => {
    it('should render with toprated source', () => {
      renderWithProviders(<MovieCard {...defaultProps} source="toprated" />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);
      expect(card).toBeInTheDocument();
    });

    it('should render with upcoming source', () => {
      renderWithProviders(<MovieCard {...defaultProps} source="upcoming" />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);
      expect(card).toBeInTheDocument();
    });

    it('should render with nowplaying source', () => {
      renderWithProviders(<MovieCard {...defaultProps} source="nowplaying" />);
      const card = screen.getByTestId(`movie-card-${mockMappedMovie.id}`);
      expect(card).toBeInTheDocument();
    });
  });
});
