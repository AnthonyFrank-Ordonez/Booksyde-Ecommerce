import { createServerFn } from '@tanstack/react-start';
import prisma from '../prisma';

import type { BookType } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const fetchBooks = createServerFn({ method: 'GET' }).handler(
	async () => {
		console.log('Fetching books from the server...');

		const books = await prisma.book.findMany();

		const serializedBooks: BookType[] = books.map((book) => ({
			...book,
			price: book.price.toNumber(),
			rating: book.rating.toNumber(),
		}));

		return serializedBooks;
	}
);

export const bookQueryOptions = () =>
	queryOptions({
		queryKey: ['books'],
		retry: 1,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		queryFn: () => fetchBooks(),
	});
