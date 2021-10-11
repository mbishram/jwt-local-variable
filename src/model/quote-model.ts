export class QuoteModel {
	name: string;
	quote: string;
	bgColor: string;

	constructor(data: QuoteModel) {
		this.name = data.name;
		this.quote = data.quote;
		this.bgColor = data.bgColor;
	}
}
