import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	const origins = (envKey: string): Array<string> => {
		const originsString = app.get(ConfigService).get(envKey);

		return JSON.parse(originsString);
	};

	app.enableCors({
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		origin: origins('WHITELIST_ORIGINS'),
	});

	app.setGlobalPrefix('v1');
	app.use(cookieParser());

	const configDocs = new DocumentBuilder()
		.setTitle('Customer Identity API')
		.setDescription('Customer identity access management service')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, configDocs);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	SwaggerModule.setup('/', app, document, {
		customCss: '.topbar {display: none}',
		customSiteTitle: 'API Docs',
	});

	await app.listen(3000);
};
bootstrap();
