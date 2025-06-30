import { z } from 'zod';

export const signUpSchema = z
	.object({
		email: z.string().email('Must be valid email'),
		username: z.string().min(8, 'Username must be atleast 8 or more'),
		password: z
			.string()
			.min(8, 'Pasword length must be 8 or more')
			.regex(/^(?=.*?[0-9]).+$/, 'Password nust have atleast 1 digit')
			.regex(
				/^(?=.*?[A-Z]).+$/,
				'Password must have alteast one capital letter'
			),
		confirmPassword: z.string(),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password is not match',
				path: ['confirmPassword'],
			});
		}
	});

export const EmailSchema = z.object({
	to: z.string(),
	username: z.string(),
	verificationUrl: z.string(),
	privacyUrl: z.string().optional(),
	termsUrl: z.string().optional(),
});

export const AddressSchema = z.object({
	houseNo: z.number(),
	street: z.string(),
	city: z.string(),
	province: z.string(),
	country: z.string(),
	defaultAddress: z.boolean(),
	postal: z.number(),
});

export const UserAddressSchema = z.object({
	houseNo: z.number(),
	street: z.string(),
	city: z.string(),
	province: z.string(),
	country: z.string(),
	defaultAddress: z.boolean(),
	postal: z.number(),
	userId: z.string(),
});

export const GetUserAddressSchema = z.object({
	userId: z.string(),
});
