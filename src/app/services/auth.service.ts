import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  loggedIn=false;

  constructor(private route: Router, private auth: AngularFireAuth, private alert: AlertController, private dataAuth: AngularFireAuth) { }
  get isLoggedIn(): boolean {
    return this.loggedIn;
}



  async login(user: string, pass: string){
    this.loggedIn=true;
    const u= await this.auth.signInWithEmailAndPassword(user+'@gmail.com', pass);
  }
  logout(){
    this.loggedIn=false;
       this.dataAuth.signOut();
    this.route.navigate(['login']);
  }

}
