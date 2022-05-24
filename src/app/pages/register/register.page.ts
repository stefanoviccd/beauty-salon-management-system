import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  allet: any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmedpassword: string;
  formGrp: FormGroup;

  constructor(
    private router: Router,
    private alert: AlertController,
    private authService: AuthService,
    //private formBuilder: FormBuilder
  ) {
    // this.formGrp = formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]]
    // })
  }

  ngOnInit() {}

  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  async registerUser() {
    const { email, password, confirmedpassword, firstName, lastName } = this;

    if (
      this.email === '' ||
      this.password === '' ||
      this.confirmedpassword === '' ||
      this.email == null ||
      this.password == null ||
      this.confirmedpassword == null
    ) {
      this.allertAll('Greška', 'Morate uneti kredencijale');
    } else {
      if (!(this.password === this.confirmedpassword)) {
        this.allertAll('Greška', 'Lozinke se ne poklapaju.');
      } else {
        this.authService
          .register(email, password, firstName, lastName)
          .subscribe(
            (data) => {
              this.allertAll('Dobrodošli!', 'Korisnik uspešno registrovan');
              this.router.navigate(['login']);
            },
            (error) => {
              this.allertAll('Greška', 'Došlo je do greške. Molimo Vas, pokušajte ponovo.');
            }
          );
      }

    }
  }
}
