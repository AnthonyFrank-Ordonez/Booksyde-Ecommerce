import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';
import { createServerFn } from '@tanstack/react-start';
import { EmailSchema } from '../zod';

import { transporter } from '../nodemailer';
import { loggingMiddleware } from '../middlewares/logging-middleware';

export const sendEmailFn = createServerFn({ method: 'POST' })
	.middleware([loggingMiddleware])
	.validator((data: unknown) => {
		return EmailSchema.parse(data);
	})
	.handler(async ({ data }) => {
		const __dirname = dirname(fileURLToPath(import.meta.url));

		const emailTemplate = fs.readFileSync(
			path.join(
				__dirname,
				'..',
				'..',
				'..',
				'template',
				'verificationEmail.html'
			),
			'utf-8'
		);

		const compileTemplate = Handlebars.compile(emailTemplate);

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
