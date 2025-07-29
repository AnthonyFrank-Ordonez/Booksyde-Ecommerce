import { createServerFn } from '@tanstack/react-start';
import { useMutation } from '@tanstack/react-query';

import { GetUserIdSchema, UpdateUserInformationSchema } from '../zod';
import prisma from '../prisma';
import { loggingMiddleware } from '../middlewares/logging-middleware';
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace';

export const findUserBySession = createServerFn({ method: 'GET' })
	.validator((data: unknown) => GetUserIdSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			const userData = await prisma.user.findUnique({
				where: {
					id: data.userId,
				},
			});

			return userData;
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				console.error('Error creating data', error);
			} else if (error instanceof Error) {
				console.error('Error creating user address', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

const updateUserInformationFn = createServerFn({ method: 'GET' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => UpdateUserInformationSchema.parse(data))
	.handler(async ({ data }) => {
		try {
			await prisma.user.update({
				where: {
					id: data.userId,
				},
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					phone: data.phone,
				},
			});

			// return data;
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				console.error('Error updating data', error);
			} else if (error instanceof Error) {
				console.error('Error updating user address', error);
			} else {
				console.error('Unkown Error', error);
			}
		}
	});

export const useUpdateUserInformation = () => {
	return useMutation({
		mutationFn: updateUserInformationFn,
	});
};

// For Future reference

// const signInServerFn = createServerFn({ method: 'POST' })
// 	.middleware([loggingMiddleware])
// 	.validator((cred: unknown) => UserCredentialsSchema.parse(cred))
// 	.handler(async ({ data }) => {
// 		const response = await auth.api.signInEmail({
// 			body: {
// 				email: data.email,
// 				password: data.password,
// 			},
// 			asResponse: true,
// 		});

// 		if (response.ok) {
// 			return { success: true };
// 		} else {
// 			const errorData: ErrorSignInType = await response.json();

// 			if (response.status === 401) {
// 				throw new Error(errorData.message);
// 			} else if (response.status === 403) {
// 				throw new Error(errorData.message);
// 			}
// 		}
// 	});

// export const useSignInUser = () => {
// 	const navigate = useNavigate();
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: signInServerFn,
// 		onSuccess: () => {
// 			queryClient.resetQueries({ queryKey: ['user-id'] });
// 			queryClient.resetQueries({ queryKey: ['user-session'] });
// 			navigate({ to: '/products' });
// 		},
// 	});
// };

// export const signUpServer = createServerFn({ method: 'POST' })
// 	.middleware([loggingMiddleware])
// 	.validator((input: unknown) => UserRegisterSchema.parse(input))
// 	.handler(async ({ data }) => {
// 		const response = await auth.api.signUpEmail({
// 			body: {
// 				email: data.email,
// 				password: data.password,
// 				name: data.name,
// 			},
// 			asResponse: true,
// 		});

// 		if (response.ok) {
// 			throw redirect({ to: '/signin' });
// 		} else {
// 			throw new Error(
// 				'Error signing up on the server. Please double check your input'
// 			);
// 		}
// 	});
