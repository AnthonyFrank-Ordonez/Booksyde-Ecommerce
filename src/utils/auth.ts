import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { reactStartCookies } from 'better-auth/react-start';
import prisma from '@/utils/prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: false,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID! as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
		},
	},
	plugins: [reactStartCookies()],
});
