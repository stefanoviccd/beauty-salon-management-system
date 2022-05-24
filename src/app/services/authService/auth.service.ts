/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = false;
  private users;
  private loggedInUser = new User(null, null, null, null, null, null);
  private urlLogin = 'https://localhost:7018/api/Login';
  private urlRegister = 'https://localhost:7018/api/Register';

  constructor(
    private route: Router,
    private alert: AlertController,
    private http: HttpClient
  ) {
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  login(email: string, pass: string) {

    const body = JSON.parse(
      JSON.stringify({
        Email: email,
        Password: pass,
      })
    );

    return this.http.post<User>(this.urlLogin, body);
  }

  logout() {
    this.loggedIn = false;
    this.loggedInUser = null;
    this.route.navigate(['login']);
  }

  register(user: string, pass: string, firstName: string, lastName: string) {
    const body = JSON.parse(
      JSON.stringify({
        Email: user,
        Password: pass,
        FirstName: firstName,
        LastName: lastName,
      })
    );

    return this.http.post<User>(this.urlRegister, body);
  }

  getUserRole() {
    return this.loggedInUser.role;
  }

  setLoggedInUser(u: User) {
    this.loggedInUser = u;
    this.loggedIn = true;
  }
}
