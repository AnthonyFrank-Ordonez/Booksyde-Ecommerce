import { createServerFn } from '@tanstack/react-start';
import { EmailSchema } from '../zod';
import fs from 'fs';
import path, { dirname } from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

import { transporter } from '../nodemailer';

export const sendEmailFn = createServerFn({ method: 'GET' })
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
