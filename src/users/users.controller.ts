import {
	Get,
	HttpCode,
	UseGuards,
	HttpStatus,
	Controller,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';

import { UserProfileDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiExtraModels(UserProfileDto)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('me')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard('jwt-access'))
	getUserProfile(@GetCurrentUserId() userId: string): Promise<UserProfileDto> {
		return this.usersService.find(userId);
	}
}
