import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  user: any;
  allet: any;

  constructor(private route: Router, private auth: AngularFireAuth, private alert: AlertController ){ }


  ngOnInit() {
  }
  register(){
    this.route.navigate(['register']);

  }
  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }
  async loginUser(){
     // async before function means that this function always return a promise
    const{ username, password}= this;
    try{
      const user= await this.auth.signInWithEmailAndPassword(username+'@gmail.com', password);
      this.allertAll('Dobrodošli', 'Uspešno ste se prijavili!');
      this.route.navigate(['home']);


    }
    catch(error){

    }

  }

}
