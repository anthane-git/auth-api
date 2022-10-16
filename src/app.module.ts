import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AccessTknGuard } from './common/guards';
import { UsersModule } from './users/users.module';

const mode = process.env.NODE_ENV;
@Module({
	imports: [
		AuthModule,
		UsersModule,
		DatabaseModule,
		ConfigModule.forRoot({
			envFilePath: !mode ? '.env.production' : `.env.${mode}`,
			isGlobal: true,
		}),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessTknGuard,
		},
	],
})
export class AppModule {}
