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
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configSrv.get('JWT_REFRESH_SECRET'),
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
		const refreshToken = req
			?.get('authorization')
			?.replace('Bearer', '')
			.trim();

		if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

		return {
			...payload,
			refreshToken,
		};
	}
}
