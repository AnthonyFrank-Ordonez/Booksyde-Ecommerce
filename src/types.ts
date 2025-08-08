import type { Prisma } from '@/generated/prisma';

// Prisma Schema Types
export type UserCartType = Prisma.CartGetPayload<{
	include: {
		items: {
			include: {
				book: true;
			};
		};
	};
}>;

type AddressNameValues =
	| 'houseNo'
	| 'street'
	| 'city'
	| 'province'
	| 'country'
	| 'postal'
	| 'defaultAddress';

export type ItemType = 'BOOK' | 'MANGA' | 'NOVEL';

export type QuantityAction = 'Increase' | 'Decrease';

export interface BookType {
	id: string;
	title: string;
	author: string;
	genres: Array<string>;
	description: string;
	coverImg: string;
	language: string;
	price: number;
	rating: number;
	slug: string;
}

export interface NewArrrivalBookType {
	title: string;
	price: number;
	description: string;
	coverImg: string;
	imageAlt: string;
	stock?: number;
}

export interface SignInType {
	email: string;
	password: string;
}

export interface ErrorSignInType {
	code: string;
	message: string;
}

export interface SignUpType {
	email: string;
	name: string;
	password: string;
}

export interface SessionType {
	id: string | undefined;
	name: string | undefined;
	image: string | null | undefined;
	email: string | undefined;
}

export interface CredentialsType {
	email: string;
	password: string;
}

export interface BookSlugType {
	slug: string;
}

export interface AddresFormObjType {
	label: string;
	name: AddressNameValues;
	type: string;
}

export interface AddressType {
	houseNo: number;
	street: string;
	city: string;
	province: string;
	country: string;
	postal: number;
	defaultAddress: boolean;
	userId: string;
}

export interface UpdateAddressObjType {
	userId: string;
	addressId: string | null;
}

export interface DeleteAddressObjType {
	userId: string;
	addressId: string | null;
}

export interface UserSessionType {
	id: string | undefined;
	name: string | undefined;
	image: string | null | undefined;
	email: string | undefined;
	firstName: string | null | undefined;
	lastName: string | null | undefined;
	phone: string | null | undefined;
}

export interface UpdateUserInformationType {
	userId: string | undefined;
	firstName: string;
	lastName: string;
	phone: string;
}

export interface UserReviewType {
	userId: string;
	bookId: string;
	rating: number;
	reviewContent: string;
}

export interface CartItemDataType {
	cartId: string;
	itemId: string;
	itemType: ItemType;
	quantity: number;

	// OPTIONALS
	bookId?: string;
	mangaId?: string;
	novelId?: string;
}

export type CartItems =
	| {
			cartItemId: string;
			price: number;
			quantity: number;
			isChecked: boolean;
			rating?: string | undefined;
			id?: string | undefined;
			title?: string | undefined;
			description?: string | undefined;
			author?: string | undefined;
			genres?: Array<string> | undefined;
			coverImg?: string | undefined;
			language?: string | undefined;
			slug?: string | undefined;
			itemType: ItemType;
	  }
	| undefined;

export interface DeleteItemObjType {
	itemId: string;
	cartId: string;
	userId: string;
}

export interface UpdateItemObjType {
	type: QuantityAction;
	itemId: string;
	cartId: string;
	userId: string;
}

export interface WishlistItemDataType {
	wishlistId: string;
	itemId: string;
	itemType: ItemType;

	// Optionals
	bookId?: string | null;
	mangaId?: string | null;
	novelId?: string | null;
}

export interface WishlistItemObjectType {
	wishlistId: string | undefined;
	userId: string | null;
	itemId: string;
	itemType: ItemType;
}

export interface AuthError {
	status: number;
	message: string;
}
