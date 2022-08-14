import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserProfileDto {
	constructor(partial: Partial<UserProfileDto>) {
		Object.assign(this, partial);
	}

	@IsUUID()
	@ApiProperty()
	readonly id: string;

	@IsString()
	@ApiProperty()
	readonly username: string;

	@IsEmail()
	@ApiProperty()
	readonly email: string;

	@Exclude()
	@ApiProperty()
	readonly hash: string;

	@Exclude()
	@ApiProperty()
	readonly hashedRt: string;
}
