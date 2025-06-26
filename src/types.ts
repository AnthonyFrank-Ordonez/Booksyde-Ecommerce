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
