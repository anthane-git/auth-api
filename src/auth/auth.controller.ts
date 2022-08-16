import { AuthGuard } from '@nestjs/passport';
import {
	Controller,
	HttpStatus,
	UseGuards,
	HttpCode,
	Body,
	Post,
	Res,
	Get,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { GetCookies, GetCurrentUserId, Public } from 'src/common/decorators';
import { RefreshTknGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authSrv: AuthService) {}

	@Public()
	@Post('local/register')
	@ApiBody({ type: RegisterDto })
	@HttpCode(HttpStatus.CREATED)
	registerLocal(
		@Res({ passthrough: true }) response: Response,
		@Body() dto: RegisterDto
	): Promise<Tokens> {
		return this.authSrv.registerLocal(dto, response);
	}

	@Public()
	@Post('local/login')
	@ApiBody({ type: LoginDto })
	@HttpCode(HttpStatus.OK)
	loginLocal(
		@Res({ passthrough: true }) response: Response,
		@Body() dto: LoginDto
	): Promise<Tokens> {
		return this.authSrv.loginLocal(dto, response);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard('jwt-access'))
	logout(
		@Res({ passthrough: true }) response: Response,
		@GetCurrentUserId() userId: string
	): Promise<boolean> {
		return this.authSrv.logout(userId, response);
	}

	@Public()
	@UseGuards(RefreshTknGuard)
	@Post('refresh-token')
	@HttpCode(HttpStatus.OK)
	refreshToken(
		@Res({ passthrough: true }) response: Response,
		@GetCurrentUserId() userId: string,
		@GetCookies('refresh-token') refreshTkn: string
	): Promise<Tokens> {
		return this.authSrv.refreshToken(userId, refreshTkn, response);
	}

	@Public()
	@Get('.well-known/jwks.json')
	publicKey() {
		return this.authSrv.publicKey();
	}
}
