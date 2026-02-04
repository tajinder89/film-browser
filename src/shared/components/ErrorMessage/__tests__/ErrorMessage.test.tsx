import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorMessage from '../ErrorMessage';
import { renderWithProviders } from '@/__tests__/utils/test-utils';

describe('ErrorMessage', () => {
  const mockOnRetry = vi.fn();
  const defaultProps = {
    message: 'Failed to load movies',
    onRetry: mockOnRetry,
  };

  describe('Rendering', () => {
    it('should render error message container', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const container = screen.getByTestId('error-message');
      expect(container).toBeInTheDocument();
    });

    it('should display error icon', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const icon = screen.getByTestId('error-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should display error title', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const title = screen.getByTestId('error-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Unable to Load');
    });

    it('should display error message', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const text = screen.getByTestId('error-text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('Failed to load movies');
    });

    it('should render retry button', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const button = screen.getByTestId('retry-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Try Again');
    });
  });

  describe('Interactions', () => {
    it('should call onRetry when retry button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ErrorMessage {...defaultProps} />);

      const button = screen.getByTestId('retry-button');
      await user.click(button);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('retry button should be keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ErrorMessage {...defaultProps} />);

      const button = screen.getByTestId('retry-button');
      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(mockOnRetry).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const container = screen.getByTestId('error-message');
      expect(container).toBeInTheDocument();
    });

    it('should have semantic button element', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const button = screen.getByTestId('retry-button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('retry button should be accessible', () => {
      renderWithProviders(<ErrorMessage {...defaultProps} />);
      const button = screen.getByTestId('retry-button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Different error messages', () => {
    it('should display custom error message', () => {
      const customMessage = 'Network error occurred';
      renderWithProviders(<ErrorMessage message={customMessage} onRetry={mockOnRetry} />);
      const text = screen.getByTestId('error-text');
      expect(text).toHaveTextContent(customMessage);
    });

    it('should handle long error messages', () => {
      const longMessage = 'This is a very long error message that might wrap to multiple lines in the UI';
      renderWithProviders(<ErrorMessage message={longMessage} onRetry={mockOnRetry} />);
      const text = screen.getByTestId('error-text');
      expect(text).toHaveTextContent(longMessage);
    });
  });
});
