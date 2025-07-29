import { Bounce, toast } from 'react-toastify';
import type { AuthError } from '@/types';

export const successMsg = (msg: string, ms: number = 5000) => {
	toast.success(msg, {
		position: 'top-right',
		autoClose: ms,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		theme: 'light',
		transition: Bounce,
	});
};

export const errorMsg = (
	msg: string,
	ms: number = 5000,
	hideProgress: boolean = true
) => {
	toast.error(msg, {
		position: 'top-right',
		autoClose: ms,
		hideProgressBar: hideProgress,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		theme: 'light',
		transition: Bounce,
	});
};

export const infoMsg = (msg: string, ms: number = 5000) => {
	toast.info(msg, {
		position: 'top-right',
		autoClose: ms,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		theme: 'light',
		transition: Bounce,
	});
};

export const isAuthError = (error: unknown): error is AuthError => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		'status' in error &&
		typeof error.status === 'number' &&
		error.status === 401
	);
};
