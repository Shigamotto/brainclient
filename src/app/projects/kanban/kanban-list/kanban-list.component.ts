import { Component, HostListener, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Card, Kanban } from '../kanban.model';
import { KanbanService } from '../kanban.service';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.css']
})
export class KanbanListComponent implements OnInit {
  @Input() list: Kanban;
  @Input() cardStore: KanbanService;
  displayAddCard = false;

  constructor(
    private projectService: ProjectsService
  ) { }

  toggleDisplayAddCard() {
    this.displayAddCard = ! this.displayAddCard;
  }

  ngOnInit(): void {
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');

    let target = $event.target;
    const targetClassName = target.className;

    while (target.className !== 'list') {
      target = target.parentNode;
    }
    target = target.querySelector('.cards');

    if (targetClassName === 'card') {
      $event.target.parentNode.insertBefore(document.getElementById(data), $event.target);
    } else if (targetClassName === 'list__title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
    console.log(data, this.list.tag);
    this.projectService.setStatus(data, this.list.tag);
  }

  onEnter(value: string) {
    const cardId =  this.cardStore.newCard(value,'', moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') );
    this.list.cards.push(cardId);
  }

}
