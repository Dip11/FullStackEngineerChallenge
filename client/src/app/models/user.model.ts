export class UserModel {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: number;

	constructor() {
		this.id = undefined;
		this.firstName = '';
		this.lastName = '';
		this.password = '';
		this.role = undefined;
	}
}
