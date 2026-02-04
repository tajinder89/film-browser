import { useWishlistStore } from '../../store/wishlistStore'

export function useFavorites(movieId: number, source: 'toprated' | 'upcoming' | 'nowplaying' = 'toprated', movieTitle = '', posterPath = '') {
  const wishlistItems = useWishlistStore((state) => state.items)
  const addToWishlist = useWishlistStore((state) => state.addToWishlist)
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)

  const isFavorited = wishlistItems.some((item) => item.id === movieId)

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromWishlist(movieId)
    } else {
      addToWishlist({
        id: movieId,
        title: movieTitle,
        source,
        posterPath: posterPath || undefined,
      })
    }
  }

  return { isFavorited, toggleFavorite }
}
