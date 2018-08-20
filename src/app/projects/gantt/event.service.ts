import {Injectable} from "@angular/core";
import {Event} from "./event";
import {Http} from "@angular/http";
import {ExtractData, HandleError} from "./service-helper";

// import 'rxjs/add/operator/toPromise';

export class EventService {
	private eventUrl = "api/tasks";
	event:Event[] = [
			{id: 1, text: "Task #1", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6},
			{id: 2, text: "Task #2", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4}
  ];

	// constructor(private http: Http) {}
  constructor() {}

	/*get(): Promise<Event[]>{
		return this.http.get(this.eventUrl)
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}

	insert(event: Event): Promise<Event> {
		return this.http.post(this.eventUrl, JSON.stringify(event))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}


	update(event: Event): Promise<void> {
		return this.http
			.put(`${this.eventUrl}/${event.id}`, JSON.stringify(event))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.eventUrl}/${id}`)
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}*/
}
