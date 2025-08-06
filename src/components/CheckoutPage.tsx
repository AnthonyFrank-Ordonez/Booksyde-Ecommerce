import React, { useEffect, useState } from 'react';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';

interface CheckoutPageProps {
	amount: number;
}

export default function CheckoutPage({ amount }: CheckoutPageProps) {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [clientSecret, setClientSecret] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetch(`${window.location.origin}/api/create-payment-intent`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: Math.round(amount * 100) }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [amount]);

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

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}/payment-success?amount=${amount}`,
			},
		});

		if (error.message) {
			setErrorMessage(error.message);
		} else {
			//
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

					<button
						disabled={loading}
						className='mt-5 w-full rounded-lg border bg-black py-3 text-center font-bold text-white disabled:animate-pulse disabled:opacity-50'
					>
						{!loading ? `Pay $${amount}` : 'Processing...'}
					</button>
				</form>
			)}
		</>
	);
}
