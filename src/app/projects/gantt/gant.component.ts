import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EventService} from './event.service';
import {LinkService} from './link.service';
import {Event, Link} from './event';

import 'dhtmlx-gantt';
import {} from '@types/dhtmlxgantt';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt',
  styleUrls: ['gant.component.css'],
	providers: [EventService, LinkService],
	template: '<div #gantt_here style=\'width: 100%; height: 600px;\'></div>',
})
export class GanttComponent implements OnInit {
	@ViewChild('gantt_here') ganttContainer: ElementRef;

	constructor(private eventService: EventService, private linkService: LinkService){}

	ngOnInit() {
	  console.log('Gant is init');
		gantt.config.xml_date = '%Y-%m-%d %H:%i';

		gantt.init(this.ganttContainer.nativeElement);

		/*gantt.attachEvent("onAfterTaskAdd", (id, item) => {
			this.taskService.insert(this.serializeTask(item, true))
				.then((response)=> {
					if (response.id != id) {
						gantt.changeTaskId(id, response.id);
					}
				});
		});

		gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
			this.eventService.update(this.serializeTask(item));
		});

		gantt.attachEvent("onAfterTaskDelete", (id) => {
			this.eventService.remove(id);
		});

		gantt.attachEvent("onAfterLinkAdd", (id, item) => {
			this.linkService.insert(this.serializeLink(item, true))
				.then((response) => {
					if(response.id != id){
						gantt.changeLinkId(id, response.id);
					}
				});
		});

		gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
			this.linkService.update(this.serializeLink(item));
		});

		gantt.attachEvent("onAfterLinkDelete", (id) => {
			this.linkService.remove(id);
		});

		Promise.all([this.eventService.get(), this.linkService.get()])
			.then(([data, links]) => {
				gantt.parse({data, links});
			});*/

    gantt.parse({data: this.eventService.event, links: this.linkService.links});
	}

	/*private serializeTask(data: any, insert: boolean = false): Event {
		return this.serializeItem(data, insert) as Event;
	}

	private serializeLink(data: any, insert: boolean = false): Link {
		return this.serializeItem(data, insert) as Link;
	}

	private serializeItem(data: any, insert: boolean): any{
		let result = {};

		for (let i of data) {
			if (i.charAt(0) == "$" || i.charAt(0) == "_") continue;
			if(insert && i == "id") continue;
			if (data[i] instanceof Date) {
				result[i] = gantt.templates.xml_format(data[i]);
			}
			else {
				result[i] = data[i];
			}
		}

		return result;
	}*/
}
