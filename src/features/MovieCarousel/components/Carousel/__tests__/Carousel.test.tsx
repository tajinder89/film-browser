import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Carousel from '../Carousel';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { mockMovieList } from '@/__tests__/mocks/mockData';

vi.mock('@/lib/hooks/useSSRParams', () => ({
  useSSRNavigate: () => vi.fn(),
}));

describe('Carousel', () => {
  const defaultProps = {
    title: 'Top Rated Movies',
    movies: mockMovieList,
    source: 'toprated' as const,
  };

  describe('Rendering', () => {
    it('should render carousel section', () => {
      renderWithProviders(<Carousel {...defaultProps} />);
      const section = screen.getByTestId('carousel-section');
      expect(section).toBeInTheDocument();
    });

    it('should display carousel title', () => {
      renderWithProviders(<Carousel {...defaultProps} />);
      expect(screen.getByText('Top Rated Movies')).toBeInTheDocument();
    });

    it('should render carousel container', () => {
      renderWithProviders(<Carousel {...defaultProps} />);
      const container = screen.getByTestId('carousel-container');
      expect(container).toBeInTheDocument();
    });

    it('should render all movie cards', () => {
      renderWithProviders(<Carousel {...defaultProps} />);
      const cards = screen.getAllByTestId(/^movie-card-/);
      expect(cards).toHaveLength(mockMovieList.length);
    });

    it('should render carousel controls', () => {
      renderWithProviders(<Carousel {...defaultProps} />);
      const controls = screen.getAllByRole('button');
      expect(controls.length).toBeGreaterThan(0);
    });
  });

  describe('Empty state', () => {
    it('should handle empty movie list', () => {
      renderWithProviders(<Carousel {...defaultProps} movies={[]} />);
      const cards = screen.queryAllByTestId(/^movie-card-/);
      expect(cards).toHaveLength(0);
    });
  });

  describe('Different sources', () => {
    it('should render with toprated source', () => {
      renderWithProviders(<Carousel {...defaultProps} source="toprated" />);
      expect(screen.getByText('Top Rated Movies')).toBeInTheDocument();
    });

    it('should render with upcoming source', () => {
      renderWithProviders(<Carousel {...defaultProps} source="upcoming" title="Upcoming Movies" />);
      expect(screen.getByText('Upcoming Movies')).toBeInTheDocument();
    });

    it('should render with nowplaying source', () => {
      renderWithProviders(<Carousel {...defaultProps} source="nowplaying" title="Now Playing" />);
      expect(screen.getByText('Now Playing')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible carousel structure', () => {
      renderWithProviders(<Carousel {...defaultProps} />);
      const section = screen.getByTestId('carousel-section');
      expect(section).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      renderWithProviders(<Carousel {...defaultProps} />);
      const title = screen.getByText('Top Rated Movies');
      expect(title).toBeInTheDocument();
    });
  });
});
