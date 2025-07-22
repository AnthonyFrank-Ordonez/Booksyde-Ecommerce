import { createMiddleware } from '@tanstack/react-start';

export const loggingMiddleware = createMiddleware({ type: 'function' }).server(
	async ({ next, data }) => {
		console.log('Request received: ', data);
		const result = await next();
		console.log('Response Processed', result);
		return result;
	}
);
