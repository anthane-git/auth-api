import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { Certs } from '../types';

@Injectable()
export class CertificatesService {
	get({ token, type, decode = true }: Certs): string | Buffer {
		if (!token || !type) return;

		const path = resolve(__dirname, `../../certs/${token}.tkn.${type}.pem`);
		const secret = readFileSync(path, decode ? 'utf-8' : undefined);

		return secret;
	}
}
