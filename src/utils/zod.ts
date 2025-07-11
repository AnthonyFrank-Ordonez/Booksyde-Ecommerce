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

export const UserCredentialsSchema = z.object({
	email: z.string().email(),
	password: z.string(),
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

export const GetUserIdSchema = z.object({
	userId: z.string(),
});

export const GetUserDefaultAddressSchema = z.object({
	sessionId: z.string(),
});

export const UpdateAddressSchema = z.object({
	userId: z.string(),
	addressId: z.string(),
});

export const DeleteAddressSchema = z.object({
	userId: z.string(),
	addressId: z.string(),
});

export const UpdateUserInformationSchema = z.object({
	userId: z.string(),
	firstName: z.string().min(3, 'Minimum first name length should be 3 or more'),
	lastName: z.string().min(3, 'Minimum last name length should be 3 or more'),
	phone: z.string().min(8, 'Invalid phone number'),
});

export const UserInformationSchema = z.object({
	firstName: z.string().min(3, 'First name length should be 3 or more'),
	lastName: z.string().min(3, 'Last name length should be 3 or more'),
	phone: z.string().min(8, 'Invalid phone number'),
});

export const ReviewSchema = z.object({
	reviewContent: z.string().min(3, 'Invalid Comment, must be 3 or more long'),
});

export const AddReviewSchema = z.object({
	bookId: z.string(),
	userId: z.string(),
	rating: z.number(),
	reviewContent: z.string(),
});
