import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isWeekend } from 'date-fns';
import * as moment from 'moment';
import { DateOff } from 'src/app/model/DateOff';
import { Treatment } from 'src/app/model/Treatment';
import { AppointmentService } from 'src/app/services/appointmentService/appointment.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { NonWorkingDayService } from 'src/app/services/nonWorkingDayService/non-working-day.service';
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
  public daysOff: Date[] = [];
  public datesModels: DateOff[] = [];

  constructor(
    private dayOffService: NonWorkingDayService,
    private treatmentService: TreatmentService,
    private auth: AuthService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDaysOff();
    this.getTreatments();
  }

  getDaysOff() {
    this.dayOffService.getDaysOff().subscribe(
      (result) => {
        this.datesModels = result;
        this.datesModels.forEach((element) => {
          this.daysOff.push(
            new Date(element['year'], element['month'] - 1, element['day'])
          );
        });
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }

  getTreatments() {
    this.treatmentService.getAllTreatments().subscribe(
      (result) => {
        this.allTreatments = result;
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }

  isButtonDisabled() {
    return this.targetTreatment == undefined || this.time == undefined;
  }

  isTimeDisabled() {
    return this.targetTreatment == undefined;
  }

  // isTimeAvailable(value){
  //   let date1;
  //   if (this.date == undefined) {
  //     date1 = new Date();
  //   } else {
  //     date1 = new Date(this.date);
  //   }
  //   console.log(value);

  //   this.appointmentService.isTimeAvailable(date1.getUTCDate(),
  //   date1.getUTCMonth() + 1,
  //   date1.getFullYear(),
  //   value.substring(0, value.indexOf(':')),
  //   value.substring(value.indexOf(':') + 1)).subscribe(
  //     data => {
  //       if(data=="true"){
  //         return true;
  //       }
  //       return false;
  //   },
  //   error => {
  //     alert("Error occured...");
  //     console.log(error);
  //   });;
  // }

  isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  isDateEnabled = (dateIsoString: string) => {
    const date = new Date(dateIsoString);

    if (this.isDateBeforeToday(date)) {
      return false;
    }

    for (let i = 0; i < this.daysOff.length; i++) {
      if (
        this.daysOff[i].getUTCMonth() == date.getUTCMonth() &&
        this.daysOff[i].getDate() == date.getDate() &&
        this.daysOff[i].getFullYear() == date.getFullYear()
      ) {
        return false;
      }
    }

    return !isWeekend(date);
  };

  requestForAppointment() {
    let date1;
    if (this.date == undefined) {
      date1 = new Date();
    } else {
      date1 = new Date(this.date);
    }
    this.appointmentService.addAppointment(
      this.targetTreatment,
      this.auth.getLoggedInUser().username,
      date1.getUTCDate(),
      date1.getUTCMonth() + 1,
      date1.getFullYear(),
      this.time.substring(0, this.time.indexOf(':')),
      this.time.substring(this.time.indexOf(':') + 1)
    ).subscribe(
      data => {
        this.router.navigate(['/home/myAppointments']);
    },
    error => {
      alert("Nije moguće zakazati uslugu u traženom terminu.");
      console.log(error);
    });

  }

  setDate(value) {
    this.date = moment(value).format('YYYY-MM-DD');
  }
}
