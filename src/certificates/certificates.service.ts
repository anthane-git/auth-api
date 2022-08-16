import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { Certs } from './types';

@Injectable()
export class CertificatesService {
	init({ token, type }: Certs) {
		if (!token || !type) return;

		const path = resolve(__dirname, `../certs/${token}.tkn.${type}.pem`);
		const secret = readFileSync(path, 'utf-8');

		return secret;
	}
}
