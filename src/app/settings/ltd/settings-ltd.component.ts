import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Task } from './projects.model';
@Component({
  selector: 'app-settings-ltd',
  templateUrl: './settings-ltd.component.html',
  styleUrls: ['./settings-ltd.component.css']
})
export class SettingsLtdComponent implements OnInit {
  // ltd:Organization[];

  constructor(private http:HttpClient) {}

  ngOnInit() {}

}
