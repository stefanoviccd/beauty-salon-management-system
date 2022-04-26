import { Component } from '@angular/core';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private user: User;
  constructor() {}
}
