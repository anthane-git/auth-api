import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload, JwtPayloadWithRt } from '../types';

@Injectable()
export class RefreshTknStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(configSrv: ConfigService) {
		super({
			secretOrKey: configSrv.get('JWT_REFRESH_SECRET'),
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
