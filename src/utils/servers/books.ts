import { createServerFn } from '@tanstack/react-start';
import prisma from '../prisma';

import type { BookSlugType, BookType } from '@/types';
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

export const fetchBookBySlugFn = createServerFn({ method: 'GET' })
	.validator((data: unknown): BookSlugType => {
		if (typeof data !== 'object' || data === null) {
			throw new Error('Data is required');
		}

		if ('slug' in data && typeof data.slug !== 'string') {
			throw new Error('Invalid Slug, need to be string!');
		}

		return data as BookSlugType;
	})
	.handler(async ({ data }) => {
		const bookSlug = data.slug;

		const book = await prisma.book.findUnique({
			where: { slug: bookSlug },
		});

		if (book) {
			const serializedBooks: BookType = {
				...book,
				price: book?.price.toNumber(),
				rating: book?.rating.toNumber(),
			};

			return serializedBooks;
		} else {
			throw new Error('Book not found');
		}
	});

export const bookslugQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: ['book', slug],
		retry: 1,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		queryFn: () => fetchBookBySlugFn({ data: { slug: slug } }),
		enabled: !!slug,
	});
