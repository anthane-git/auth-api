import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/register')
  registerLocal(@Body() dto: AuthDto) {
    return this.authService.registerLocal(dto);
  }

  @Post('/local/login')
  loginLocal(@Body() dto: AuthDto) {
    return this.authService.loginLocal(dto);
  }

  @Post('/refresh-token')
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }
}
