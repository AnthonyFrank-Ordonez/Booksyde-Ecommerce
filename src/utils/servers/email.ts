import { createServerFn } from '@tanstack/react-start';
import { EmailSchema } from '../zod';
import { compileTemplate } from '../utilities';
import { transporter } from '../nodemailer';

export const sendEmailFn = createServerFn({ method: 'GET' })
	.validator((data: unknown) => {
		return EmailSchema.parse(data);
	})
	.handler(async ({ data }) => {
		const html = compileTemplate({
			username: data.username,
			verificationUrl: data.verificationUrl,
			privacyUrl: 'https://example.com/',
			termsUrl: 'https://example.com/',
		});

		const emailOptions = {
			from: process.env.NODEMAILER_USER,
			to: data.to,
			subject: 'Verify Your Email Address',
			html: html,
		};

		try {
			await transporter.sendMail(emailOptions);
		} catch (error) {
			console.error(error);
		}
	});
