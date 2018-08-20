import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Card } from '../kanban.model';
import { Task } from '../../projects.model';


@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {
  @Input() card: Task;

  constructor() { }

  ngOnInit() { }

  dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

}
