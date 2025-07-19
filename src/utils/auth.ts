import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { reactStartCookies } from 'better-auth/react-start';
import { customSession } from 'better-auth/plugins';

import prisma from './prisma';
import { sendEmailFn } from './servers/email';
import { findUserBySession } from './servers/user';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	plugins: [
		customSession(async ({ user, session }) => {
			const newUserData = await findUserBySession({
				data: { userId: session.userId },
			});

			return {
				user: {
					...user,
					firstName: newUserData?.firstName,
					lastName: newUserData?.lastName,
					phone: newUserData?.phone,
				},
			};
		}),
		reactStartCookies(),
	],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		autoSignIn: false,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		},
		google: {
			prompt: 'select_account',
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
		facebook: {
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		expiresIn: 60 * 5, // 5 minutes
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await sendEmailFn({
				data: { to: user.email, username: user.name, verificationUrl: url },
			});
		},
	},
	advanced: {
		cookiePrefix: 'booksyde-cookies-session',
	},
});
