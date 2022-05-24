import { Component, OnChanges, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Appointment } from 'src/app/model/Appointment';
import { AppointmentService } from 'src/app/services/appointmentService/appointment.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.page.html',
  styleUrls: ['./my-appointments.page.scss'],
})
export class MyAppointmentsPage implements OnInit {
  public appointments;
  allet: any;

  constructor(private authService: AuthService, private appointmentService: AppointmentService, private alert: AlertController) {
   }


  ngOnInit() {
    this.getAppointments();
  }

  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  getAppointments(){
    const u=this.authService.getLoggedInUser();
    this.appointmentService.getUserAppointments(u).subscribe(
      (result) => {
        this.appointments = result;
      },
      (error) => {
        this.allertAll('Greška', 'Došlo je do greške.');
      }
    );
  }
  
  deleteAppointment(e: Appointment){
    this.appointmentService.delete(e).subscribe(
      (result) => {
        this.allertAll('', 'Termin uspešno otkazan.');
        this.ngOnInit();
      },
      (error) => {
        this.allertAll('Greška', 'Došlo je do greške. Molimo Vas, pokušajte ponovo.');
      }
    );
  }

}
