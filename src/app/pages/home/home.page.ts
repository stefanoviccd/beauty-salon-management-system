import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/authService/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User;

  constructor(private router: Router, private authService: AuthService, private renderer: Renderer2) {
    this.user=new User('dragana', 'dragana','','','', new Role('client'));
   }

  ngOnInit() {
  }
  logoutUser(){
   // this.dataAuth.signOut();
    //this.router.navigate(['login']);
    this.authService.logout();

  }
  getUserRole(){
    return this.authService.getUserRole().name;
  }

  public changeTheme(event){
   if(event.detail.checked){
     this.renderer.setAttribute(document.body,'color-theme', 'dark');
   }
   else{
    this.renderer.setAttribute(document.body,'color-theme', 'light');
   }

}
}
