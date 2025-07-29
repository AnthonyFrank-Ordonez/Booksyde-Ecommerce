import type {
	AddresFormObjType,
	AddressType,
	CartItems,
	UserAddressType,
	UserCartType,
	UserSessionType,
} from './types';

declare global {
	interface Window {
		userSession: UserSessionType | null;
		userCart: UserCartType;
		cartItems: Array<CartItems>;
	}
}
