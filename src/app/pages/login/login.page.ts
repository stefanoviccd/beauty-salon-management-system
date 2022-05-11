import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authService/auth.service';

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

  constructor(private route: Router, private auth: AngularFireAuth, private alert: AlertController, private authService: AuthService ){ }


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

          //const user= await this.auth.signInWithEmailAndPassword(username+'@gmail.com', password);
      //this.allertAll('Dobrodošli', 'Uspešno ste se prijavili!');
     const user= this.authService.login(username, password);
     if((await user).role.name==='client'){ this.route.navigate(['home/myAppointments']);}
     else{ this.route.navigate(['home/scheduledAppointments']);}

    }
    catch(error){
      if(this.username==='' || this.password==='' || this.username==null || this.password==null){
        this.allertAll('Greška', 'Morate uneti kredencijale');

      }
      else{
        this.allertAll('Greška', 'Neispravno korisničko ime ili lozinka. Pokušajte ponovo.');
      }
    }

  }

}
