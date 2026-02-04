import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface LayoutProps {
  children?: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const Layout = ({ children, loading, error, onRetry }: LayoutProps) => {
  return (
    <div className="app">
      <Header />{loading ? (
        <main className="app-main">
          <LoadingSpinner />
        </main>
      ) : error ? (
        <main className="app-main">
          <ErrorMessage message={error} onRetry={onRetry || (() => {})} />
        </main>
      ) : (
        <>
          {children}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
