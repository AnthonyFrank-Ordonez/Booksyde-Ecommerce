import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

// For Nodemailer
export const emailTemplate = fs.readFileSync(
	path.join(__dirname, '..', '..', 'template', 'verificationEmail.html')
);

export const compileTemplate = Handlebars.compile(emailTemplate);
