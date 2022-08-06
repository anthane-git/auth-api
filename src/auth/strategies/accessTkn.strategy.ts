import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { JwtPayload } from '../types';

@Injectable()
export class AccessTknStrategy extends PassportStrategy(
	Strategy,
	'jwt-access'
) {
	constructor(configSrv: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configSrv.get('JWT_ACCESS_SECRET'),
			ignoreExpiration: false,
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
