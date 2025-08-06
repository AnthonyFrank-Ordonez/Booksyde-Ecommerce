import { createServerFileRoute } from '@tanstack/react-start/server';
import { json } from '@tanstack/react-start';
import { stripe } from '@/utils/stripe';

export const ServerRoute = createServerFileRoute(
	'/api/create-checkout-session'
).methods({
	POST: async ({ request }) => {
		const body = await request.json();
		const { products } = body;

		const lineItems = products.map((product) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: product.title,
					images: [product.coverImg],
				},
				unit_amount: Math.round(product.price * 100),
			},
			quantity: product.quantity,
		}));

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: lineItems,
			mode: 'payment',
			success_url: 'http://localhost:3000/cart',
			cancel_url: 'http://localhost:3000/checkout',
		});

		return json({ id: session.id });
	},
});
