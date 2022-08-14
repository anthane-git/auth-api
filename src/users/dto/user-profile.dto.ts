import { Exclude } from 'class-transformer';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserProfileDto {
	@IsUUID()
	readonly id: string;

	@IsString()
	readonly username: string;

	@IsEmail()
	readonly email: string;

	@Exclude()
	readonly hash: string;

	@Exclude()
	readonly hashedRt: string;

	constructor(partial: Partial<UserProfileDto>) {
		Object.assign(this, partial);
	}
}
