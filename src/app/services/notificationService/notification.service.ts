import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { User } from 'src/app/model/User';
import { UserNotification } from 'src/app/model/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  url = 'https://localhost:7018/api/Notification';

  constructor(private http: HttpClient) {}

  getReadNotifications(u: User) {
    return this.http.get<UserNotification[]>(`${this.url}/read/` + u.username);
  }

  getUnreadNotifications(u: User) {
    return this.http.get<UserNotification[]>(`${this.url}/unread/` + u.username);
  }

  getUnreadCount(u: User) {
    return this.http.get<number>(`${this.url}/count/` + u.username);
  }


  deleteNotification(n: UserNotification) {
    return this.http.delete(this.url + '/' + n.id);
  }


}
