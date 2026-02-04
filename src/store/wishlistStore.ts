import { create } from 'zustand'

export interface WishlistItem {
  id: number
  title: string
  source: 'toprated' | 'upcoming' | 'nowplaying'
  posterPath?: string
}

interface WishlistStore {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (movieId: number) => void
  loadWishlist: (items: WishlistItem[]) => void
}

/**
 * Zustand store for managing the user's wishlist
 */
export const useWishlistStore = create<WishlistStore>((set) => ({
  items: [],

  addToWishlist: (item: WishlistItem) =>
    set((state) => {
      const exists = state.items.some((wishlistItem) => wishlistItem.id === item.id)
      if (exists) return state
      return { items: [...state.items, item] }
    }),

  removeFromWishlist: (movieId: number) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== movieId),
    })),

  loadWishlist: (items: WishlistItem[]) =>
    set(() => ({
      items,
    })),
}))
