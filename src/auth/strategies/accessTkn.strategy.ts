import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { JwtPayload } from '../types';
import { CertificatesService } from 'src/certificates/certificates.service';

@Injectable()
export class AccessTknStrategy extends PassportStrategy(
	Strategy,
	'jwt-access'
) {
	constructor(certsSrv: CertificatesService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: certsSrv.init({ token: 'access', type: 'public' }),
			ignoreExpiration: false,
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
