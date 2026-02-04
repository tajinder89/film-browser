interface FavoriteButtonProps {
  isFavorited: boolean
  onToggle: () => void
}

export function FavoriteButton({ isFavorited, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
      data-testid="favorite-button"
    >
      {isFavorited ? (
        <>
          <span>♥</span>
          <span>Remove from Wishlist</span>
        </>
      ) : (
        <>
          <span>♡</span>
          <span>Add to Wishlist</span>
        </>
      )}
    </button>
  )
}
