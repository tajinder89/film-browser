import './error-message.scss';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="error-message-container" data-testid="error-message">
      <div className="error-icon" data-testid="error-icon">⚠</div>
      <p className="error-title" data-testid="error-title">Unable to Load</p>
      <p className="error-text" data-testid="error-text">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button" data-testid="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
