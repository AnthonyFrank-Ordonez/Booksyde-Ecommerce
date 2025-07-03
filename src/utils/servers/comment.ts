import { createServerFn } from '@tanstack/react-start';
import { useMutation } from '@tanstack/react-query';
import { AddReviewSchema } from '../zod';
import prisma from '../prisma';

export const addReviewFn = createServerFn({ method: 'GET' })
	.validator((data: unknown) => AddReviewSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			await prisma.comment.create({
				data: {
					content: data.reviewContent,
					rating: data.rating,
					userId: data.userId,
					bookId: data.bookId,
				},
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('Error adding review', error);
			}
		}
	});

export const useAddReview = () => {
	return useMutation({
		mutationFn: addReviewFn,
	});
};
