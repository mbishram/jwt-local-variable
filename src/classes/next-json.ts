export class NextJson<Data> {
	success: boolean;
	message: string;
	data?: Array<Data>;

	constructor(data: NextJson<Data>) {
		this.success = data.success;
		this.message = data.message;
		this.data = data.data || [];
	}
}
