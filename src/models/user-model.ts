import { ObjectId } from "bson";

export class UserModel {
	id: ObjectId;
	username: string;
	name: string;
	email: string;
	password?: string;

	constructor(data: UserModel) {
		this.id = data.id;
		this.username = data.username;
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
	}
}
