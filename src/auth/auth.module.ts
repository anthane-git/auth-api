import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CertificatesService } from './certificates/certificates.service';
import { AccessTknStrategy, RefreshTknStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwkService } from './jwk/jwk.service';

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [
		AuthService,
		AccessTknStrategy,
		RefreshTknStrategy,
		CertificatesService,
		JwkService,
	],
})
export class AuthModule {}
