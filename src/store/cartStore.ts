import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
	checkedItemIds: Set<string>;

	// Setters
	clearItemIds: () => void;

	// Getters
	isItemChecked: (id: string) => boolean;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			checkedItemIds: new Set(),

			// Setters
			clearItemIds: () => set({ checkedItemIds: new Set() }),

			// Getters
			isItemChecked: (id: string) => {
				return get().checkedItemIds.has(id);
			},
		}),
		{
			name: 'cart-store',
			partialize: (state) => ({
				checkedItemIds: state.checkedItemIds,
			}),
		}
	)
);
