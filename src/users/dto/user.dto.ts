import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
} from 'class-validator';

export class UserDto {
	@IsUUID()
	readonly id: string;

	@IsString()
	@MaxLength(40)
	readonly username: string;

	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(60)
	readonly password: string;
}
