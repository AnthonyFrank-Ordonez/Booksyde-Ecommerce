import type {
	AddresFormObjType,
	AddressType,
	UserAddressType,
	UserCartType,
	UserSessionType,
} from './types';

declare global {
	interface Window {
		userSession: UserSessionType;
		userCart: UserCartType;
	}
}
