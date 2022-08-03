import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  HttpStatus,
  UseGuards,
  HttpCode,
  Body,
  Post,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RefreshTknGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  registerLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.registerLocal(dto);
  }

  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  loginLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.loginLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt-access'))
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTknGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshTkn: string,
  ): Promise<Tokens> {
    return this.authService.refreshToken(userId, refreshTkn);
  }
}
