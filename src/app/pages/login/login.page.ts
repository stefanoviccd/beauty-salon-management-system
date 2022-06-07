import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authService/auth.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  user: User;
  allet: any;
  token: any;

  constructor(
    private route: Router,
    private auth: AngularFireAuth,
    private alert: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  register() {
    this.route.navigate(['register']);
  }

  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  async loginUser() {
    const { username, password } = this;
    if(username.trim()==='' || password.trim()===''){
      this.allertAll(
        'Greška',
        'Morate uneti kredencijale.'
      );
        return;
    }
    if(!username.includes('@')){
      this.allertAll(
        'Greška',
        'Unesite validnu e-mail adresu.'
      );
      return;

    }

    this.authService.login(username, password).subscribe(
      (data) => {
        this.user = data['user'];
        this.authService.setLoggedInUser(this.user);
        window.localStorage.setItem('token', data['token']);
        if (this.user.role === 'CLIENT') {
          this.route.navigate(['home/myAppointments']);
        } else {
          this.route.navigate(['home/scheduledAppointments']);
        }
      },
      (error) => {
        if (
          this.username === '' ||
          this.password === '' ||
          this.username == null ||
          this.password == null
        ) {
          this.allertAll('Greška', 'Morate uneti kredencijale');
        } else {
          this.allertAll(
            'Greška',
            'Neispravno korisničko ime ili lozinka. Pokušajte ponovo.'
          );
        }
      }
    );
  }
}
