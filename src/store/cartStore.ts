import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
	checkedItemIds: Set<string>;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			checkedItemIds: new Set(),
		}),
		{
			name: 'cart-store',
			partialize: (state) => ({
				checkedItemIds: state.checkedItemIds,
			}),
		}
	)
);
