import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private user: User;

  constructor(private router: Router, private dataAuth: AngularFireAuth) {
    this.user=new User('dragana', 'dragana', new Role('client'));
   }

  ngOnInit() {
  }
  logoutUser(){
    this.dataAuth.signOut();
    this.router.navigate(['login']);

  }
  getUserRole(){
    return this.user.role.name;
  }

}
