import type {
	AddresFormObjType,
	AddressType,
	UserAddressType,
	UserSessionType,
} from './types';

declare global {
	interface Window {
		userSession: UserSessionType;
	}
}
