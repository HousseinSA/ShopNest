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
          return toast('Item already in cart!')
        }
        set({
          items: [...get().items, item],
        })
        toast('item successfully added!')
      },
      deleteItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.id !== id)],
        })
        toast('item deleted!')
      },
      deleteAll: () => {
        set({
          items: [],
        })
      toast('items deleted!')

      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartState
