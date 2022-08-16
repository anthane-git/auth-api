import { Injectable } from '@nestjs/common';
import { JWK } from 'node-jose';

@Injectable()
export class JwkService {
	async init(input: Buffer) {
		const keystore = JWK.createKeyStore();
		await keystore.add(input.toString(), 'pem');

		return keystore.toJSON();
	}
}
