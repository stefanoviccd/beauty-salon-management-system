import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isWeekend } from 'date-fns';
import * as moment from 'moment';
import { Appointment } from 'src/app/model/Appointment';
import { Treatment } from 'src/app/model/Treatment';
import { AppointmentService } from 'src/app/services/appointmentService/appointment.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { TreatmentService } from 'src/app/services/threatmentService/treatment.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {
  public allTreatments;
  public targetTreatment;
  public date;
  public time;
  public selectedTreatment: Treatment;
  constructor(private treatmentService: TreatmentService, private auth: AuthService, private appointmentService: AppointmentService,
     private router: Router) {
    this.allTreatments=treatmentService.getAllTreatments();
  }
  ngOnInit() {

  }
  isDateEnabled = (dateIsoString: string) => {
    // TODO: da se onemoguce plus jos neradni dani iz baze
    const date = new Date(dateIsoString);
    return !isWeekend(date);
  };
  requestForAppointment(){
    console.log(this.targetTreatment);
    const treatment=this.treatmentService.getByName(this.targetTreatment);
    const e=new Appointment(this.auth.getLoggedInUser(), this.date, this.time, null, 'zahtevan');
    this.appointmentService.addAppointment(e);
    console.log(e);
    this.router.navigate(['/home/myAppointments']);
  }
  setDate(value){
this.date= moment(value).format('YYYY-MM-DD');
  }

}
