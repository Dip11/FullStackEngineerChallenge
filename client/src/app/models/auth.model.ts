export class AuthModel{
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
	refresh_token: string;

	constructor() {
		this.access_token = '';
		this.expires_in = 0;
		this.token_type = '';
		this.scope = '';
		this.refresh_token = '';
	}
}