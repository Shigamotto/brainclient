import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import * as moment from 'moment';

import { Card } from '../kanban.model';
import { Task } from '../../projects.model';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {
  @Output() dragIsFinish = new EventEmitter<any>();
  @Input() card: Card;
  private draggingStart = false;

  constructor() { }

  ngOnInit() { }

  dragOver() { this.card.finished = true; }

  dragLeave() { this.card.finished = false; }

  dragStart(ev) {
    this.draggingStart = true;
    this.card.finished = false;
    ev.dataTransfer.setData('text', ev.target.id);
  }

  dragEnd() {
    this.draggingStart = false;
    this.dragIsFinish.emit();
  }

}
