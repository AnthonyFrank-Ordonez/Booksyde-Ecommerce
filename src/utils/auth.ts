import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { reactStartCookies } from 'better-auth/react-start';

import prisma from './prisma';
import { sendEmailFn } from './servers/email';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	plugins: [reactStartCookies()],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		autoSignIn: false,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID! as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
		},
		google: {
			prompt: 'select_account',
			clientId: process.env.GOOGLE_CLIENT_ID! as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
		},
		facebook: {
			clientId: process.env.FACEBOOK_CLIENT_ID! as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET! as string,
		},
	},
	rateLimit: {
		enabled: true,
		storage: 'database',
		modelName: 'rateLimit',
		window: 60,
		max: 3,
		customRules: {
			'/sign-in/email': {
				window: 60,
				max: 3,
			},
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
