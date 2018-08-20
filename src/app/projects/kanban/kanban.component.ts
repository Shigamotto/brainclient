import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ProjectsService } from '../projects.service';
import { Task } from '../projects.model';

import { Card, Kanban } from './kanban.model';
import { KanbanService } from './kanban.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  cardStore: KanbanService;
  lists: Kanban[];
  kanbanSubscription: Subscription;
  taskSubscription: Subscription;

constructor(private projectService: ProjectsService) { }
  setMockData(kanbans?: Kanban[]): void {
    this.cardStore = new KanbanService();
    const mockLists: Kanban[] = [
      {
        name: 'Draft',
        tag: 'draft',
        cards: []
      },
      {
        name: 'To Do',
        tag: 'todo',
        cards: [],
      },
      {
        name: 'Doing',
        tag: 'doing',
        cards: []
      },
      {
        name: 'Finalization',
        tag: 'finalization',
        cards: []
      },
      {
        name: 'Waiting to confirm',
        tag: 'waitingtoconfirm',
        cards: []
      },
      {
        name: 'Done',
        tag: 'done',
        cards: []
      }
    ];
    this.lists = mockLists;
  }

  ngOnInit() {
    this.setMockData();
    this.projectService.getKanban();
    this.kanbanSubscription = this.projectService.kanbanChanged.subscribe((kanban: Kanban[]) => {
      this.lists = kanban;

      this.projectService.getTasks();
      this.taskSubscription = this.projectService.taskChanged.pipe(
        map( (tasks: Task[]) => {
          return tasks.map((task: Task) => {
            task['id'] = task['id'] ? task['id'] : task['pk'];
            const date = moment(task['date']['pub']).format('YYYY MMM DD HH:mm'); //  moment(task['update'].format('YYYY MMM DD HH:mm')
            const cardId =  this.cardStore.newCard(
              task['title'],
              task['title'] ? task['title'] : task['desc'],
              date,
              String(task['id'])
            );
            // const tag = 'done';
            const tag = task['status']['tag'];
            this.lists.map( (list) => {
              if (list.tag === tag) {
                list.cards.push(cardId);
              }
            });
            return task;
          });
        }))
        .subscribe(
          (tasks: Task[]) => {
            tasks.map( (task: Task) => {
              this.cardStore.lastid = task['id'] > this.cardStore.lastid ? task['id'] : this.cardStore.lastid;
            });
            // console.log(tasks);
            // console.log(this.cardStore);
            // console.log(this.lists);
          });
    });
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
    this.kanbanSubscription.unsubscribe();
  }
}
