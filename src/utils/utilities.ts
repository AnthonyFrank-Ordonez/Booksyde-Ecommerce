import fs from 'fs';
import path from 'path';

export const emailTemplate = fs.readFileSync(
	path.join(__dirname, '..', '..', 'template', 'verificationEmail.html')
);
