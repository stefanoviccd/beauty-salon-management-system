import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  allet: any;
  username: string;
  password: string;
  confirmedpassword: string;


  constructor(private router: Router, private alert: AlertController, private dataAuth: AngularFireAuth) {}

  ngOnInit() {}

  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }
  async registerUser() {
    const {username, password, confirmedpassword}= this;
    try{
      const res= await this.dataAuth.createUserWithEmailAndPassword(username+'@gmail.com', password);
      this.allertAll('Dobrodošli!', 'Korisnik uspešno registrovan');
    this.router.navigate(['login']);
    }
    catch(error){
      this.allertAll('Greška!', error.message);
    }

  }
}
