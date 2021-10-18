export class NextJson<Data> {
	success: boolean;
	message: string;
	data?: Data;

	constructor(data: NextJson<Data>) {
		this.success = data.success || false;
		this.message = data.message || "";
		this.data = data.data;
	}
}