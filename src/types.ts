import type { Prisma } from './generated/prisma';

// Prisma Schema Types
const cartInclude = {
	items: {
		include: {
			book: true,
		},
	},
} satisfies Prisma.CartInclude;

export type UserCartType = Prisma.CartGetPayload<{
	include: typeof cartInclude;
}>;

type AddressNameValues =
	| 'houseNo'
	| 'street'
	| 'city'
	| 'province'
	| 'country'
	| 'postal'
	| 'defaultAddress';

export interface BookType {
	id: number;
	title: string;
	author: string;
	genres: string[];
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
	addressId: number | null;
}

export interface DeleteAddressObjType {
	userId: string;
	addressId: number | null;
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
	bookId: number;
	rating: number;
	reviewContent: string;
}
