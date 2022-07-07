export class QuoteModel {
	name: string;
	quote: string;
	bgColor: string;
	userId?: string;
	username?: string;

	constructor(data: QuoteModel) {
		this.name = data.name;
		this.quote = data.quote;
		this.bgColor = data.bgColor;
		this.userId = data.userId;
		this.username = data.username;
	}
}
