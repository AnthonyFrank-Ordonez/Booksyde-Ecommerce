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
}

export interface NewArrrivalBookType {
	title: string;
	price: number;
	description: string;
	coverImg: string;
	imageAlt: string;
	stock?: number;
}
