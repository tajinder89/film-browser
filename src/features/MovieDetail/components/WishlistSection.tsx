import { SSRLink } from '@components/SSRLink'
import { getImageUrl } from '@lib/api'
import { useWishlistStore } from '../../../store/wishlistStore'

export function WishlistSection() {
  const wishlistMovies = useWishlistStore((state) => state.items)
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)

  return (
    <div className="wishlist-section" data-testid="wishlist-section">
      <h2 className="wishlist-title">My Wishlist</h2>
      {wishlistMovies && wishlistMovies.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistMovies.map((wishlistMovie) => wishlistMovie && (
            <div
              key={wishlistMovie.id}
              className="wishlist-item"
              data-testid={`wishlist-item-${wishlistMovie.id}`}
            >
              <SSRLink
                to={`/movie/${wishlistMovie.id}?source=${wishlistMovie.source}`}
                className="wishlist-item-link"
              >
                <img
                  src={getImageUrl(wishlistMovie.posterPath || '', 'POSTER')}
                  alt={wishlistMovie.title}
                  className="wishlist-item-image"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23f0f0f0" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="16" text-anchor="middle" dy=".3em" fill="%23999"%3E{wishlistMovie.title}%3C/text%3E%3C/svg%3E'
                  }}
                />
                <span className="wishlist-item-title">{wishlistMovie.title}</span>
              </SSRLink>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  removeFromWishlist(wishlistMovie.id)
                }}
                className="wishlist-remove-btn"
                data-testid={`wishlist-remove-${wishlistMovie.id}`}
                title="Remove from wishlist"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="wishlist-empty" data-testid="wishlist-empty">
          <p>No movies in your wishlist yet. Add some to get started!</p>
        </div>
      )}
    </div>
  )
}
