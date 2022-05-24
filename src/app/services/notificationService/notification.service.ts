import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders,
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
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    return this.http.get<UserNotification[]>(`${this.url}/read/` + u.email, {
      headers: hdr
    });
  }

  getUnreadNotifications(u: User) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    return this.http.get<UserNotification[]>(`${this.url}/unread/` + u.email,  {
      headers: hdr
    });
  }

  getUnreadCount(u: User) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    return this.http.get<number>(`${this.url}/count/` + u.email,  {
      headers: hdr
    });
  }


  deleteNotification(n: UserNotification) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    return this.http.delete(this.url + '/' + n.id,  {
      headers: hdr
    });
  }


}
