import { AuthGuard } from '@nestjs/passport';
import {
	Controller,
	HttpStatus,
	UseGuards,
	HttpCode,
	Body,
	Post,
	Res,
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
	constructor(private authService: AuthService) {}

	@Public()
	@Post('local/register')
	@ApiBody({ type: RegisterDto })
	@HttpCode(HttpStatus.CREATED)
	registerLocal(
		@Res({ passthrough: true }) response: Response,
		@Body() dto: RegisterDto
	): Promise<Tokens> {
		return this.authService.registerLocal(dto, response);
	}

	@Public()
	@Post('local/login')
	@ApiBody({ type: LoginDto })
	@HttpCode(HttpStatus.OK)
	loginLocal(
		@Res({ passthrough: true }) response: Response,
		@Body() dto: LoginDto
	): Promise<Tokens> {
		return this.authService.loginLocal(dto, response);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard('jwt-access'))
	logout(
		@Res({ passthrough: true }) response: Response,
		@GetCurrentUserId() userId: string
	): Promise<boolean> {
		return this.authService.logout(userId, response);
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
		return this.authService.refreshToken(userId, refreshTkn, response);
	}
}
