import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/authService/auth.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User;
  public unreadCount;

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    private notificationService: NotificationService
  ) {
    this.user = new User('dragana', 'dragana', '', '', '', new Role('client'));
  }

  ngOnInit() {
    this.getUnreadNotificationsCount();
    setTimeout(() => { this.ngOnInit() }, 1000 * 5)
  }

  logoutUser() {
    // this.dataAuth.signOut();
    //this.router.navigate(['login']);
    this.authService.logout();
  }

  getUnreadNotificationsCount() {
    this.notificationService
      .getUnreadCount(this.authService.getLoggedInUser())
      .subscribe(
        (result) => {
          this.unreadCount = result;
        },
        (error) => {
          console.log('Error occured', error);
        }
      );
  }

  getUserRole() {
    return this.authService.getUserRole().name;
  }

  public changeTheme(event) {
    if (event.detail.checked) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }
}
