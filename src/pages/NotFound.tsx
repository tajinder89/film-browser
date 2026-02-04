import { SSRLink } from '@components/SSRLink'

export function NotFound() {
  return (
    <div className="not-found-page" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#666' }}>
        The page you're looking for doesn't exist.
      </p>
      <SSRLink
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          transition: 'background-color 0.2s',
        }}
      >
        Back to Home
      </SSRLink>
    </div>
  )
}
