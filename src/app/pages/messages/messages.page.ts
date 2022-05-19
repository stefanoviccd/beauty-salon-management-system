import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserNotification } from 'src/app/model/Notification';
import { AuthService } from 'src/app/services/authService/auth.service';
import { NotificationService } from 'src/app/services/notificationService/notification.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  public readNotifications;
  public unreadNotifications;
  private allet: any;

  constructor(private authService: AuthService, private notificationService: NotificationService, private alert: AlertController) { }

  ngOnInit() {
    this.getNotifications();
  }
  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  getNotifications(){
    const u=this.authService.getLoggedInUser();

    this.notificationService.getReadNotifications(u).subscribe(
      (result) => {
        this.readNotifications = result;
      },
      (error) => {
        console.log('Error occured', error);
      }
    );

    this.notificationService.getUnreadNotifications(u).subscribe(
      (result) => {
        this.unreadNotifications = result;
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }

  deleteNotification(n:UserNotification){
    this.notificationService.deleteNotification(n).subscribe(
      data => {
      this.ngOnInit();
    },
    error => {
      this.allertAll('Greska', 'Doslo je do greske.');
    });
  }

}
