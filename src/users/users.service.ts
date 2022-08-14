import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { UserProfileDto } from './dto';

@Injectable()
export class UsersService {
	constructor(private dbSrv: DatabaseService) {}

	async find(userId: string): Promise<UserProfileDto> {
		const user = await this.dbSrv.user
			.findUnique({
				where: {
					id: userId,
				},
			})
			.catch(err => {
				throw err;
			});

		return new UserProfileDto(user);
	}
}
