  import { create } from 'zustand';
  import { persist, createJSONStorage } from 'zustand/middleware';
  import { Product } from '@/lib/StoreTypes';
  import toast from 'react-hot-toast';

  interface CartItem {
    userId: string;
    product: Product;
  }

  interface CartProp {
    items: CartItem[];
    userId: string | null; // Add userId state
    setUserId: (id: string) => void; // Function to set userId
    addItem: (item: Product) => void; // Remove userId from here
    deleteItem: (id: string) => void; // Remove userId from here
    deleteAll: () => void; // Remove userId from here
  }

  const useCartState = create(
    persist<CartProp>(
      (set, get) => ({
        items: [],
        userId: null, // Initialize userId as null
        setUserId: (id) => set({ userId: id }), // Function to set userId
        addItem: (item) => {
          const currentItems = get().items;
          const existingItem = currentItems.find(
            (cartItem) => cartItem.product.id === item.id && cartItem.userId === get().userId
          );
          if (existingItem) {
            return toast('Product already in cart!', {
              duration: 2000,
              position: 'bottom-center',
            });
          }
          set({
            items: [...currentItems, { userId: get().userId!, product: item }], // Use current userId
          });
          toast.success('Product added!', {
            duration: 2000,
            position: 'bottom-center',
          });
        },
        deleteItem: (id) => {
          set({
            items: get().items.filter((cartItem) => cartItem.product.id !== id),
          });
          toast.success('Product removed!', {
            duration: 2000,
            position: 'bottom-center',
          });
        },
        deleteAll: () => {
          set({ items: [] }); // Clear all items
        },
      }),
      {
        name: 'cart-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

  export default useCartState;