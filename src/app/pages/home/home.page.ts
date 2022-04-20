import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private dataAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  logoutUser(){
    this.dataAuth.signOut();
    this.router.navigate(['login']);

  }

}
