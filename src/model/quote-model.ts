export class QuoteModel {
	name: string;
	quote: string;

	constructor(data: QuoteModel) {
		this.name = data.name;
		this.quote = data.quote;
	}
}
