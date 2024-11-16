import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/StoreTypes';
import toast from 'react-hot-toast';

interface CartItem {
    userId: string;
    storeId: string; // Add storeId to CartItem
    product: Product;
}

interface CartProp {
    items: CartItem[];
    userId: string | null; // Keep userId state
    storeId: string | null; // Add storeId state
    setUserId: (id: string) => void; // Function to set userId
    setStoreId: (id: string) => void; // Function to set storeId
    addItem: (item: Product) => void; // Update addItem to not require storeId
    deleteItem: (id: string) => void;
    deleteAll: () => void;
}

const useCartState = create(
    persist<CartProp>(
        (set, get) => ({
            items: [],
            userId: null, // Initialize userId as null
            storeId: null, // Initialize storeId as null
            setUserId: (id) => set({ userId: id }), // Function to set userId
            setStoreId: (id) => set({ storeId: id }), // Function to set storeId
            addItem: (item) => {
                const currentItems = get().items;
                const { userId, storeId } = get();

                if (!storeId) {
                    toast.error('Store ID is not set!', {
                        duration: 2000,
                        position: 'bottom-center',
                    });
                    return;
                }

                const existingItem = currentItems.find(
                    (cartItem) =>
                        cartItem.product.id === item.id &&
                        cartItem.userId === userId &&
                        cartItem.storeId === storeId // Check for storeId as well
                );

                if (existingItem) {
                    return toast('Product already in cart!', {
                        duration: 2000,
                        position: 'bottom-center',
                    });
                }

                // Add new item to the cart with userId and storeId
                set({
                    items: [...currentItems, { userId: userId!, storeId, product: item }],
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