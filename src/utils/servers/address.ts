import { createServerFn } from '@tanstack/react-start';
import { AddressSchema } from '../zod';
import { useMutation } from '@tanstack/react-query';

export const addAddressFn = createServerFn({ method: 'POST' })
	.validator((data: unknown) => AddressSchema.parse(data))
	.handler(async ({ data }) => {
		console.log(data);
	});

export const useAddAddress = () =>
	useMutation({
		mutationFn: addAddressFn,
	});
