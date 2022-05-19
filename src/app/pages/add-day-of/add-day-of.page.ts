import { Component, OnInit } from '@angular/core';
import { isWeekend, parseISO } from 'date-fns';
import { NonWorkingDayService } from 'src/app/services/nonWorkingDayService/non-working-day.service';
import * as moment from 'moment';
import { DateOff } from 'src/app/model/DateOff';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-day-of',
  templateUrl: './add-day-of.page.html',
  styleUrls: ['./add-day-of.page.scss'],
})
export class AddDayOfPage implements OnInit {
  public dayOff;
  public datesModels: DateOff[] = [];
  public daysOff: Date[] = [];
  private allet: any;

  constructor(private dayOffService: NonWorkingDayService,
    private alert: AlertController) {}

  ngOnInit() {
    this.getDaysOff();
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
  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  setDayOff(value) {
    this.dayOff = value;
  }

  addDayOff() {
    this.dayOff = moment(this.dayOff).format('YYYY-MM-DD');
    const date = new Date(this.dayOff);
    this.dayOffService.addDayOff(date).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => {
       this.allertAll('Greska', 'Doslo je do greske, pokusajte kasnije.');
      }
    );
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
}
