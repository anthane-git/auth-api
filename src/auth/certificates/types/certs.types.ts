export type Certs = {
	token: 'access' | 'refresh';
	type: 'private' | 'public';
	decode?: boolean;
};
