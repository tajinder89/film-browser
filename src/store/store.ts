import { useWishlistStore } from './wishlistStore'

/**
 * Initialize wishlist from localStorage on app start
 * This is called from the app initialization
 */
export const initializeWishlist = () => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const stored = localStorage.getItem('wishlist')
    if (stored) {
      const wishlist = JSON.parse(stored)
      useWishlistStore.getState().loadWishlist(wishlist)
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load wishlist from localStorage:', error)
    }
  }
}

/**
 * Setup localStorage persistence for wishlist
 * This should be called once during app initialization
 */
export const setupWishlistPersistence = () => {
  if (typeof window === 'undefined') {
    return
  }

  return useWishlistStore.subscribe(
    (state) => {
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    }
  )
}
