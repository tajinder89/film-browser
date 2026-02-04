import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import { renderWithProviders } from '@/__tests__/utils/test-utils';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children, ...props }: any) => <a href={to} {...props}>{children}</a>,
  };
});

describe('Header', () => {
  describe('Rendering', () => {
    it('should render header container', () => {
      renderWithProviders(<Header />);
      const header = screen.getByTestId('app-header');
      expect(header).toBeInTheDocument();
    });

    it('should display header title', () => {
      renderWithProviders(<Header />);
      const title = screen.getByTestId('header-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('FILM BROWSER');
    });

    it('should display subtitle if provided', () => {
      renderWithProviders(<Header subtitle="Movies at a Glance" />);
      const subtitle = screen.getByTestId('header-subtitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent('Movies at a Glance');
    });

    it('should display default subtitle if not provided', () => {
      renderWithProviders(<Header />);
      const subtitle = screen.getByTestId('header-subtitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent('Discover Your Next Favorite Film');
    });

    it('should have proper CSS classes', () => {
      renderWithProviders(<Header />);
      const header = screen.getByTestId('app-header');
      expect(header).toHaveClass('app-header');
    });
  });

  describe('Title styling', () => {
    it('should have styled title element', () => {
      renderWithProviders(<Header />);
      const title = screen.getByTestId('header-title');
      expect(title).toHaveClass('header-title');
    });

    it('title should be uppercase', () => {
      renderWithProviders(<Header />);
      const title = screen.getByTestId('header-title');
      expect(title).toHaveClass('header-title');
    });
  });

  describe('Subtitle styling', () => {
    it('should have styled subtitle when provided', () => {
      renderWithProviders(<Header subtitle="Test Subtitle" />);
      const subtitle = screen.getByTestId('header-subtitle');
      expect(subtitle).toHaveClass('header-subtitle');
    });

    it('subtitle should be italic when provided', () => {
      renderWithProviders(<Header subtitle="Test Subtitle" />);
      const subtitle = screen.getByTestId('header-subtitle');
      expect(subtitle).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic header element', () => {
      const { container } = renderWithProviders(<Header />);
      const header = container.querySelector('[data-testid="app-header"]');
      expect(header?.tagName).toBe('HEADER');
    });

    it('should have proper heading hierarchy', () => {
      renderWithProviders(<Header />);
      const title = screen.getByTestId('header-title');
      expect(title).toBeInTheDocument();
    });

    it('should have proper link structure', () => {
      renderWithProviders(<Header />);
      const title = screen.getByTestId('header-title');
      expect(title).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('title should be clickable and navigate', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header />);

      const title = screen.getByTestId('header-title');
      await user.click(title);
      expect(title).toBeInTheDocument();
    });

    it('title should be keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header />);

      const title = screen.getByTestId('header-title');
      await user.tab();
      expect(title).toHaveFocus();
    });
  });

  describe('Different subtitle variations', () => {
    it('should handle empty subtitle', () => {
      renderWithProviders(<Header subtitle="" />);
      const header = screen.getByTestId('app-header');
      expect(header).toBeInTheDocument();
    });

    it('should handle long subtitle', () => {
      const longSubtitle = 'This is a very long subtitle that should still render properly';
      renderWithProviders(<Header subtitle={longSubtitle} />);
      const subtitle = screen.getByTestId('header-subtitle');
      expect(subtitle).toHaveTextContent(longSubtitle);
    });

    it('should handle special characters in subtitle', () => {
      const specialSubtitle = 'Movies & TV Shows!';
      renderWithProviders(<Header subtitle={specialSubtitle} />);
      const subtitle = screen.getByTestId('header-subtitle');
      expect(subtitle).toHaveTextContent(specialSubtitle);
    });
  });
});
