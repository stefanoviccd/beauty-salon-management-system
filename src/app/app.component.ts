import { Component } from '@angular/core';
import { User } from './model/User';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private user: User;
  constructor(private http: HttpClient) {}
}
