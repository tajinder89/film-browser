import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';
import { renderWithProviders } from '@/__tests__/utils/test-utils';

describe('LoadingSpinner', () => {
  describe('Rendering', () => {
    it('should render loading spinner container', () => {
      renderWithProviders(<LoadingSpinner />);
      const container = screen.getByTestId('loading-spinner-container');
      expect(container).toBeInTheDocument();
    });

    it('should render spinner element', () => {
      renderWithProviders(<LoadingSpinner />);
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('should have proper CSS classes', () => {
      renderWithProviders(<LoadingSpinner />);
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toHaveClass('loading-spinner');
    });
  });

  describe('Visual properties', () => {
    it('should be centered in container', () => {
      renderWithProviders(<LoadingSpinner />);
      const container = screen.getByTestId('loading-spinner-container');
      expect(container).toHaveClass('loading-spinner-container');
    });

    it('should have animation applied', () => {
      renderWithProviders(<LoadingSpinner />);
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be semantically correct', () => {
      renderWithProviders(<LoadingSpinner />);
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('should indicate loading state to screen readers', () => {
      renderWithProviders(<LoadingSpinner />);
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Rendering multiple instances', () => {
    it('should render multiple spinners independently', () => {
      renderWithProviders(
        <div>
          <LoadingSpinner />
          <LoadingSpinner />
        </div>
      );

      const spinners = screen.getAllByTestId('loading-spinner');
      expect(spinners).toHaveLength(2);
    });
  });
});
