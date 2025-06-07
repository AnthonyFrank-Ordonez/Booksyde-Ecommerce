import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: process.env.MAILTRAP_HOST,
	port: Number(process.env.MAILTRAP_PORT),
	secure: false,
	auth: {
		user: process.env.MAILTRAP_USERNAME,
		pass: process.env.MAILTRAP_PASSWORD,
	},
});
