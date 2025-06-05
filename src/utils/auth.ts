import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { reactStartCookies } from 'better-auth/react-start';

import prisma from './prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
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
	plugins: [reactStartCookies()],
});
