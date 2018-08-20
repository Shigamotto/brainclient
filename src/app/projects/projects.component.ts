import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from './projects.model';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  tasks:Task[];

  constructor(private http:HttpClient) {}

  ngOnInit() {
    /*
    console.log('Loading projects...');
    this.http.get<Task[]>('http://127.0.0.1:8000/api/task/?format=json').subscribe(data => {
      console.log(data);
      this.tasks = data;
    });
    */
  }

}
