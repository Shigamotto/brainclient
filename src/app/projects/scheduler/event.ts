export class Event {
	id: number;
	start_date: string;
	end_date: string;
	text: string;
	constructor(
    id: number,
    start_date: string,
    end_date: string,
    text: string,
    ) {
      this.id=id;
      this.text = text;
      this.start_date = start_date;
      this.end_date = end_date
  }
}
