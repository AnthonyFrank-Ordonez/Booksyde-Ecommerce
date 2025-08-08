import { z } from 'zod';

export const CartItemSchema = z.object({
	cartItemId: z.string(),
	price: z.coerce.number(),
	quantity: z.number().int().min(1),
	isChecked: z.boolean(),
	rating: z.string().optional(),
	id: z.string().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
	author: z.string().optional(),
	genres: z.array(z.string()).optional(),
	coverImg: z.string().optional(),
	language: z.string().optional(),
	slug: z.string().optional(),
	itemType: z.enum(['BOOK', 'MANGA', 'NOVEL']),
});

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

export const UserRegisterSchema = z.object({
	email: z.string().email(),
	name: z.string().min(7, 'Must be valid username'),
	password: z.string().min(8, 'Password must be atleast 8 or more'),
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

export const AddToCartSchema = z.object({
	cartId: z.string(),
	userId: z.string(),
	itemId: z.string(),
	itemType: z.enum(['BOOK', 'MANGA', 'NOVEL']),
	quantity: z.number(),
});

export const DeleteCartitemSchema = z.object({
	cartId: z.string(),
	itemId: z.string(),
	userId: z.string(),
});

export const UpdateItemQuantitySchema = z.object({
	type: z.enum(['Increase', 'Decrease']),
	cartId: z.string(),
	itemId: z.string(),
	userId: z.string(),
});

export const AddToWishlistSchema = z.object({
	wishlistId: z.string(),
	userId: z.string(),
	itemId: z.string(),
	itemType: z.enum(['BOOK', 'MANGA', 'NOVEL']),
});

export const RemoveToWishlistSchema = z.object({
	wishlistId: z.string(),
	userId: z.string(),
	itemId: z.string(),
	itemType: z.enum(['BOOK', 'MANGA', 'NOVEL']),
});

export const MakePaymentSchema = z.object({
	amount: z.number(),
});

export const PaymentSuccessSearchSchema = z.object({
	amount: z.number(),
	paymentIntentId: z.string(),
	orderId: z.string().optional(),
});

export const CreateOrderSchema = z.object({
	userId: z.string(),
	totalAmount: z.number(),
	paymentIntentId: z.string(),
	shippingAddressId: z.string(),
	cartItems: z.array(CartItemSchema),
});
