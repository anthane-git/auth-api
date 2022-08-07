import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('protected')
@ApiTags('protected')
export class ProtectedController {
	@Get()
	@HttpCode(HttpStatus.OK)
	protected() {
		return { message: 'Protected Route Reached' };
	}
}
