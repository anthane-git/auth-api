import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.setGlobalPrefix('v1');

	const config = new DocumentBuilder()
		.setTitle('Customer Identity API')
		.setDescription('Customer identity access management service')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	SwaggerModule.setup('/', app, document);

	await app.listen(3000);
};
bootstrap();
