import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('protected')
@ApiTags('protected')
@ApiBearerAuth()
export class ProtectedController {
	@Get()
	@HttpCode(HttpStatus.OK)
	protected() {
		return { message: 'Protected Route Reached' };
	}
}
