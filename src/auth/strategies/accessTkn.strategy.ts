import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { CertificatesService } from '../certificates/certificates.service';
import { JwtPayload } from '../types';

@Injectable()
export class AccessTknStrategy extends PassportStrategy(
	Strategy,
	'jwt-access'
) {
	constructor(certsSrv: CertificatesService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: certsSrv.get({ token: 'access', type: 'public' }),
			ignoreExpiration: false,
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
