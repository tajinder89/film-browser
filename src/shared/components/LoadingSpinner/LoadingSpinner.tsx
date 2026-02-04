import './loading-spinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="content-state">
      <div data-testid="loading-spinner-container" className="loading-spinner-container">
        <div data-testid="loading-spinner" className="loading-spinner" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
