import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public  loggedIn=false;
  private users;
  private loggedInUser=new User(null,null,null,null,null,null);

  constructor(private route: Router,  private alert: AlertController) {
    const u1=new User('dragana', 'dragana','Dragana', 'Stefanovic', '0876655443', new Role('client'));
    const u2=new User('admin', 'admin','Admin', 'Admin', '0876655443', new Role('admin'));
    this.users=[u1,u2];
    this.loggedIn=JSON.parse(window.localStorage.isLoggedIn);
    this.loggedInUser=JSON.parse(window.localStorage.loggedInUser);


   }
  get isLoggedIn(): boolean {
    return this.loggedIn;
}
 public getLoggedInUser(){
  return this.loggedInUser;
}



  async login(user: string, pass: string){
    this.users.forEach(u => {
      if(u.username===user && u.password===pass){
      this.loggedIn=true;
    this.loggedInUser=u;}
    });
    window.localStorage.loggedInUser = JSON.stringify(this.loggedInUser);
    window.localStorage.isLoggedIn = JSON.stringify(true);

    return this.loggedInUser;
  }
  logout(){
    this.loggedIn=false;
    this.loggedInUser=null;
    this.route.navigate(['login']);
    window.localStorage.loggedInUser = JSON.stringify(this.loggedInUser);
    window.localStorage.isLoggedIn = JSON.stringify(false);

  }
  getUserRole(){
    return this.loggedInUser.role;
  }
}
