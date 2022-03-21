export class UserModel {
	username: string;
	name: string;
	email: string;
	password?: string;

	constructor(data: UserModel) {
		this.username = data.username;
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
	}
}
