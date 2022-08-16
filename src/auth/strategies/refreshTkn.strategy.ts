import { ForbiddenException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { CertificatesService } from '../certificates/certificates.service';
import { JwtPayload, JwtPayloadWithRt } from '../types';

@Injectable()
export class RefreshTknStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(certsSrv: CertificatesService) {
		super({
			secretOrKey: certsSrv.get({ token: 'refresh', type: 'public' }),
			passReqToCallback: true,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const data = request?.cookies['refresh-token'];
					return data ? data : null;
				},
			]),
		});
	}

	validate(request: Request, payload: JwtPayload): JwtPayloadWithRt {
		const refreshTkn = {
			data:
				request?.get('authorization')?.replace('Bearer', '').trim() ||
				request?.cookies['refresh-token'].data,
		};

		if (!refreshTkn) throw new ForbiddenException('Refresh token malformed');

		return {
			refreshToken: refreshTkn.data,
			...payload,
		};
	}
}
