import { createServerFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';
import { MakePaymentSchema } from '../zod';

const makePaymentFn = createServerFn({ method: 'POST' })
	.validator((data: unknown) => MakePaymentSchema.parse(data))
	.handler(async ({ data }) => {
		const response = await fetch('/api/create-payment-intent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: Math.round(data.amount * 100) }),
		});

		const result = await response.json();

		return result.clientSecret;
	});

export const useMakePayment = (amount: number) =>
	queryOptions({
		queryKey: ['checkout', amount],
		queryFn: () => makePaymentFn({ data: { amount } }),
		enabled: amount > 0,
		gcTime: 0,
		refetchOnWindowFocus: false,
		retry: 1,
	});
