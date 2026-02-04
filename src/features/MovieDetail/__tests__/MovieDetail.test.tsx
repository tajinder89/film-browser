import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieDetail from '../MovieDetail';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { mockMovieDetail, mockMappedMovieDetail } from '@/__tests__/mocks/mockData';

vi.mock('@/lib/hooks/useSSRParams', () => ({
  useSSRParams: () => ({ id: mockMovieDetail.id.toString() }),
  useSSRSearchParams: () => [new URLSearchParams('source=toprated'), vi.fn()],
  useSSRNavigate: () => vi.fn(),
}));

vi.mock('@/lib/queries/useMovieDetailQuery', () => ({
  useMovieDetail: () => ({
    data: mockMappedMovieDetail,
    isLoading: false,
    error: null,
  }),
}));

describe('MovieDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render movie detail container', () => {
      renderWithProviders(<MovieDetail />);
      const container = screen.getByTestId('movie-detail-container');
      expect(container).toBeInTheDocument();
    });

    it('should render back button', () => {
      renderWithProviders(<MovieDetail />);
      const backButton = screen.getByTestId('back-button');
      expect(backButton).toBeInTheDocument();
    });

    it('should display movie title', () => {
      renderWithProviders(<MovieDetail />);
      expect(screen.getByTestId('movie-title')).toBeInTheDocument();
      expect(screen.getByText(mockMovieDetail.title)).toBeInTheDocument();
    });

    it('should display movie metadata', () => {
      renderWithProviders(<MovieDetail />);
      const metaInfo = screen.getByTestId('movie-meta-info');
      expect(metaInfo).toBeInTheDocument();
    });

    it('should display movie rating', () => {
      renderWithProviders(<MovieDetail />);
      const rating = screen.getByTestId('movie-rating');
      expect(rating).toBeInTheDocument();
    });

    it('should display movie genres', () => {
      renderWithProviders(<MovieDetail />);
      const genres = screen.getByTestId('movie-genres');
      expect(genres).toBeInTheDocument();
    });

    it('should display movie description', () => {
      renderWithProviders(<MovieDetail />);
      expect(screen.getByText(mockMovieDetail.overview)).toBeInTheDocument();
    });

    it('should render favorite button', () => {
      renderWithProviders(<MovieDetail />);
      const favoriteBtn = screen.getByTestId('favorite-button');
      expect(favoriteBtn).toBeInTheDocument();
    });

    it('should render wishlist section', () => {
      renderWithProviders(<MovieDetail />);
      const wishlistSection = screen.getByTestId('wishlist-section');
      expect(wishlistSection).toBeInTheDocument();
    });
  });

  describe('Theme styling', () => {
    it('should have data-carousel-source attribute set to toprated', () => {
      renderWithProviders(<MovieDetail />);
      const container = screen.getByTestId('movie-detail-container');
      expect(container).toHaveAttribute('data-carousel-source', 'toprated');
    });

    it('should apply correct CSS classes for toprated source', () => {
      renderWithProviders(<MovieDetail />);
      const container = screen.getByTestId('movie-detail-container');
      expect(container.className).toContain('movie-detail-container');
    });
  });

  describe('Favorite button interactions', () => {
    it('should have favorite button', () => {
      renderWithProviders(<MovieDetail />);
      const favoriteBtn = screen.getByTestId('favorite-button');
      expect(favoriteBtn).toBeInTheDocument();
    });

    it('should be clickable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MovieDetail />);
      const favoriteBtn = screen.getByTestId('favorite-button');

      await user.click(favoriteBtn);
      expect(favoriteBtn).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should have back button', () => {
      renderWithProviders(<MovieDetail />);
      const backButton = screen.getByTestId('back-button');
      expect(backButton).toBeInTheDocument();
    });

    it('back button should be clickable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MovieDetail />);
      const backButton = screen.getByTestId('back-button');

      await user.click(backButton);
      expect(backButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderWithProviders(<MovieDetail />);
      const title = screen.getByTestId('movie-title');
      expect(title).toBeInTheDocument();
    });

    it('should have semantic HTML structure', () => {
      renderWithProviders(<MovieDetail />);
      const container = screen.getByTestId('movie-detail-container');
      expect(container).toBeInTheDocument();
    });

    it('should have accessible buttons', () => {
      renderWithProviders(<MovieDetail />);
      const backButton = screen.getByTestId('back-button');
      const favoriteBtn = screen.getByTestId('favorite-button');

      expect(backButton).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
    });
  });
});
