import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CertificatesModule } from './certificates/certificates.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AccessTknGuard } from './common/guards';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		DatabaseModule,
		CertificatesModule,
		ConfigModule.forRoot({ isGlobal: true }),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessTknGuard,
		},
	],
})
export class AppModule {}
