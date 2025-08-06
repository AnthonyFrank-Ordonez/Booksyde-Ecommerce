import { createServerFileRoute } from '@tanstack/react-start/server';
import { json } from '@tanstack/react-start';
import { stripe } from '@/utils/stripe';

export const ServerRoute = createServerFileRoute(
	'/api/create-payment-intent'
).methods({
	POST: async ({ request }) => {
		try {
			const { amount } = await request.json();

			const paymentIntent = await stripe.paymentIntents.create({
				amount: amount,
				currency: 'usd',
				automatic_payment_methods: { enabled: true },
			});

			return json({ clientSecret: paymentIntent.client_secret });
		} catch (error) {
			console.error('Server Error: ', error);

			return new Response(`Server Error: ${error}`, { status: 500 });
		}
	},
});
