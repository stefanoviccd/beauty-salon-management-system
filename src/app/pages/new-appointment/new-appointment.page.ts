import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  public freeAppointments;
  public timeDisabled = true;

  private allet: any;
  constructor(
    private dayOffService: NonWorkingDayService,
    private treatmentService: TreatmentService,
    private auth: AuthService,
    private appointmentService: AppointmentService,
    private router: Router,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.getDaysOff();
    this.getTreatments();
  }
  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  treatmentChanged(){
  this.timeDisabled=true;
  this.time = undefined;
   if (this.date != undefined) {
      let date1 = new Date(this.date);
      this.appointmentService
        .getFreeAppointmentsForTreatment(date1, this.targetTreatment)
        .subscribe(
          (data) => {
            this.freeAppointments = data;
            console.log(this.freeAppointments);
            this.timeDisabled = false;
          },
          (error) => {
            alert(error.error);
          }
        );
    }
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
    if (this.date === undefined) {
      date1 = new Date();
    } else {
      date1 = new Date(this.date);
    }
    this.appointmentService
      .addAppointment(
        this.targetTreatment,
        this.auth.getLoggedInUser().email,
        date1.getUTCDate(),
        date1.getUTCMonth() + 1,
        date1.getFullYear(),
        this.time.substring(0, this.time.indexOf(':')),
        this.time.substring(this.time.indexOf(':') + 1)
      )
      .subscribe(
        (data) => {
          this.router.navigate(['/home/myAppointments']);
        },
        (error) => {
          this.allertAll(
            'Greška',
            'Nije moguće zakazati uslugu u traženom terminu.'
          );
          console.log(error);
        }
      );
  }

  isTimeDisabled(){
    return this.timeDisabled;
  }

  setDate(value) {
    this.time = undefined;
    this.date = moment(value).format('YYYY-MM-DD');
    if (this.targetTreatment != undefined) {
      let date1 = new Date(this.date);
      //povuci termine za ovaj datum i uslugu
      // popuni listu termina
      this.appointmentService
        .getFreeAppointmentsForTreatment(date1, this.targetTreatment)
        .subscribe(
          (data) => {
            this.freeAppointments = data;
            console.log(this.freeAppointments);
            this.timeDisabled = false;
          },
          (error) => {
            alert(error.error);
          }
        );
    }
  }
}
