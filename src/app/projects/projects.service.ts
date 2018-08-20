import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { Task } from './projects.model';
import { OAuthService } from '../oauth/oauth.service';
import { Kanban } from './kanban/kanban.model';

@Injectable()
export class ProjectsService {
  private kanban: Kanban[] = [];
  private tasks: Task[] = [];
  private task: Task;

  kanbanChanged = new Subject<Kanban[]>();
  taskChanged = new Subject<Task[]>();
  taskChose = new Subject<Task>();
  token: string;

  constructor(private router: Router,
              private http: HttpClient,
              private authService: OAuthService) {}

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.taskChanged.next(this.tasks.slice());
  }

  getTasks() {
    this.http.get<Task[]>('http://127.0.0.1:8000/api/tasks/?format=json')
      .subscribe(
        (tasks: Task[]) => {
          this.setTasks(tasks);
      });
  }

  setTask(tasks: Task) {
    this.task = tasks;
    this.taskChose.next(this.task);
  }

  getTask(id: number) {
    this.http.get<Task>('http://127.0.0.1:8000/api/tasks/' + id + '/?format=json')
      .subscribe(
        (task: Task) => {
          this.setTask(task);
      });
  }

  getFreshTasks() {
    this.http.get<Task[]>('http://127.0.0.1:8000/api/tasks/fresh/?format=json')
      .subscribe(
        (tasks: Task[]) => {
          this.setTasks(tasks);
      });
  }

  makeTask(title: string, start: string, end: string) {
    this.http.post('http://127.0.0.1:8000/api/tasks/create/',
      {title: title, date_start: start, date_end: end} )
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

  editTask(id: number, title: string, start: string, end: string) {
    this.http.put('http://127.0.0.1:8000/api/tasks/' + id + '/edit/',
      {title: title, date_start: start, date_end: end} )
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

  deleteTask(id: number) {
    this.http.delete('http://127.0.0.1:8000/api/task/' + id + '/delete/')
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );

  }

  setKanban(kanban: Kanban[]) {
    this.kanban = kanban;
    this.kanbanChanged.next(this.kanban.slice());
  }

  getKanban() {
    this.http.get<Kanban[]>('http://127.0.0.1:8000/api/tasks/kanban/')
      .subscribe( (kanban: Kanban[]) => {
        this.setKanban(kanban);
      });
  }
  setStatus(id: number, status: string) {
    this.http.patch('http://127.0.0.1:8000/api/tasks/' + id + '/edit/',
      {status: status} )
      .subscribe(
        res => { console.log(res); },
        err => { console.log(err); }
      );
  }

}
