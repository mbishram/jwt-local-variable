export class QuoteModel {
	name: string;
	quote: string;
	bgColor: string;
	userId?: string;

	constructor(data: QuoteModel) {
		this.name = data.name;
		this.quote = data.quote;
		this.bgColor = data.bgColor;
		this.userId = data.userId;
	}
}
