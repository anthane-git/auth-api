import { AuthGuard } from '@nestjs/passport';

export class RefreshTknGuard extends AuthGuard('jwt-refresh') {
	constructor() {
		super();
	}
}
