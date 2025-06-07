import fs from 'fs';
import path, { dirname } from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// For Nodemailer
export const emailTemplate = fs.readFileSync(
	path.join(__dirname, '..', '..', 'template', 'verificationEmail.html'),
	'utf-8'
);

export const compileTemplate = Handlebars.compile(emailTemplate);
