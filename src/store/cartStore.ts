import { create } from 'zustand';

interface CartStore {
	checkedItemIds: Set<string>;
	cartPage: string;

	// Setters
	addItem: (id: string) => void;
	removeItem: (id: string) => void;
	clearItemIds: () => void;
	setCartPage: (page: string) => void;

	// Getters
	isItemChecked: (id: string) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
	checkedItemIds: new Set(),
	cartPage: 'cart',

	// Setters
	addItem: (id) =>
		set((state) => {
			const newSet = new Set(state.checkedItemIds);

			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}

			return { checkedItemIds: newSet };
		}),
	removeItem: (id: string) =>
		set((state) => {
			const newSet = new Set(state.checkedItemIds);
			newSet.delete(id);
			return { checkedItemIds: newSet };
		}),
	clearItemIds: () => set({ checkedItemIds: new Set() }),
	setCartPage: (page: string) => set({ cartPage: page }),

	// Getters
	isItemChecked: (id: string) => {
		return get().checkedItemIds.has(id);
	},
}));
