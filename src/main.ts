import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		credentials: true,
		origin: [
			'http://localhost:5173',
			'http://blaze.app.localhost:5173',
			'http://localhost',
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	});

	app.setGlobalPrefix('v1');
	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle('Customer Identity API')
		.setDescription('Customer identity access management service')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	SwaggerModule.setup('/', app, document);

	await app.listen(3000);
};
bootstrap();
