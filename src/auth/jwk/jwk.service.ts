import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { JWK } from 'node-jose';

@Injectable()
export class JwkService {
	async init(input: Buffer) {
		const keystore = JWK.createKeyStore();
		await keystore.add(input.toString(), 'pem', {
			kid: createHmac('sha256', input).digest('base64'),
		});

		return keystore.toJSON();
	}
}
