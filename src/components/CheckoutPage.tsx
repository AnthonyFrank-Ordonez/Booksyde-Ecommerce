import React, { useState } from 'react';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import type { CartItems } from '@/types';
import { useMakePayment } from '@/utils/servers/checkout';
import { useCreateOrder } from '@/utils/servers/order';
import { useCartStore } from '@/store/cartStore';

interface CheckoutPageProps {
	checkOutItems: Array<CartItems>;
	amount: number;
	shippingAddressId: string;
	userId: string;
	userName: string;
	userEmail: string;
	userPhone: string | null | undefined;
}

export default function CheckoutPage({
	checkOutItems,
	amount,
	shippingAddressId,
	userId,
	userEmail,
	userName,
	userPhone,
}: CheckoutPageProps) {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const { clearItemIds } = useCartStore();
	const { mutateAsync: createOrder } = useCreateOrder();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [clientSecret, setClientSecret] = useState('');
	const [loading, setLoading] = useState(false);

	const queryOptions = useMakePayment(amount);
	const {
		data: clientSecretData,
		error: clientSecretError,
		isLoading: clientSecretLoading,
	} = useQuery(queryOptions);

	if (clientSecretError) {
		console.log('Error: ', clientSecretError);
	} else if (clientSecretLoading) {
		console.log('loading data...');
	} else if (clientSecretData) {
		if (clientSecret !== clientSecretData) {
			setClientSecret(clientSecretData);
		}
	}

	const handleSubmitPayment = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError && submitError.message) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			clientSecret,
			redirect: 'if_required',
			confirmParams: {
				return_url: `${window.location.origin}/payment-success?amount=${amount}`,
				payment_method_data: {
					billing_details: {
						name: userName,
						email: userEmail,
						phone: userPhone,
					},
				},
			},
		});

		if (error) {
			if (error.type === 'card_error' || error.type === 'validation_error') {
				setErrorMessage(error.message || 'Payment Failed');
			} else {
				setErrorMessage(`An unexpected error occured: ${error.message}`);
			}
			setLoading(false);
			return;
		}

		if (paymentIntent.status === 'succeeded') {
			console.log('Payment Successful!, proccessing order...');
			const order = {
				userId: userId,
				totalAmount: amount,
				paymentIntentId: paymentIntent.id,
				shippingAddressId: shippingAddressId,
				cartItems: checkOutItems,
			};

			const orderResult = await createOrder({ data: order });

			clearItemIds();

			navigate({
				to: '/payment-success',
				search: {
					amount: amount,
					paymentIntentId: paymentIntent.id,
					orderId: orderResult?.orderId,
				},
			});
		} else if (paymentIntent.status === 'requires_action') {
			setErrorMessage('Your payment requires additional verification.');
		} else {
			setErrorMessage('Payment was not completed successfully.');
		}

		setLoading(false);
	};

	return (
		<>
			{!clientSecret || !stripe || !elements ? (
				<div className='flex w-full animate-pulse flex-col gap-5 rounded-lg py-6'>
					<div className='h-10 rounded bg-gray-300' />
					<div className='h-12 rounded bg-gray-300' />
					<div className='h-12 rounded bg-gray-300' />
				</div>
			) : (
				<form onSubmit={handleSubmitPayment}>
					{clientSecret && <PaymentElement />}

					{errorMessage && <div>{errorMessage}</div>}

					<div className='mt-5 flex flex-col items-center justify-center gap-3 lg:max-w-lg lg:flex-row 2xl:max-w-2xl'>
						<button
							disabled={loading}
							className='w-full cursor-pointer rounded-lg border bg-black py-3 text-center font-bold text-white hover:bg-black/80 disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-50'
						>
							{!loading ? `Pay $${amount}` : 'Processing...'}
						</button>

						<Link
							to='/cart'
							className='w-full rounded-lg border border-black bg-white py-3 text-center font-medium text-black transition-colors duration-300 hover:bg-black/10'
						>
							Back to Cart
						</Link>
					</div>
				</form>
			)}
		</>
	);
}
