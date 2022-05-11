import { Component, OnChanges, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private appointmentService: AppointmentService) {
   }


  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(){
    const u=this.authService.getLoggedInUser();
    this.appointments=this.appointmentService.getUserAppointments(u);
    console.log(this.appointments);
  }
  deleteAppointment(e: Appointment){
    this.appointmentService.delete(e);
  }

}
