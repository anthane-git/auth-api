import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTknGuard } from './common/guards';
import { ProtectedModule } from './protected/protected.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		AuthModule,
		ProtectedModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessTknGuard,
		},
	],
})
export class AppModule {}
