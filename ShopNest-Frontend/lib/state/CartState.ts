import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '@/lib/StoreTypes'
import toast from 'react-hot-toast'

interface CartProp {
  items: Product[]
  addItem: (item: Product) => void
  deleteItem: (id: string) => void
  deleteAll: () => void
}

const useCartState = create(
  persist<CartProp>(
    (set, get) => ({
      items: [],
      addItem: (item: Product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((it) => it.id === item.id)
        if (existingItem) {
          return toast('product already in cart!', {
            duration: 2000,
            position: 'bottom-center',
          })
        }
        set({
          items: [...get().items, item],
        })
        toast.success('product added!', {
          duration: 2000,
          position: 'bottom-center',
        })
      },
      deleteItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.id !== id)],
        })
        toast.success('product removed!', {
          duration: 2000,
          position: 'bottom-center',
        })
      },
      deleteAll: () => {
        set({
          items: [],
        })
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartState
