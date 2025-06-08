// import { getWebRequest } from '@tanstack/react-start/server';

// // Rate Limit
// export const getClientIp = () => {
// 	const request = getHeaders();
// 	console.log('🚀 ~ getClientIp ~ request:', request);

// 	// const forwardedFor = request?.headers.get('x-forwarded-for');
// 	// const realIp = request?.headers.get('x-real-ip');

// 	// console.log('🚀 ~ getClientIp ~ realIp:', realIp);
// 	// console.log('🚀 ~ getClientIp ~ forwardedFor:', forwardedFor);

// 	// if (forwardedFor) return forwardedFor.split(',')[0].trim();
// 	// if (realIp) return realIp.trim();
// 	return null;
// };

// export const rateLimit = async () => {
// 	const ip = getClientIp();
// 	console.log('🚀 ~ rateLimit ~ ip:', ip);
// };
