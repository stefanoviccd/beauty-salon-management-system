import { Component, OnInit } from '@angular/core';
import { isWeekend, parseISO } from 'date-fns';
import { NonWorkingDayService } from 'src/app/services/nonWorkingDayService/non-working-day.service';
import * as moment from 'moment';
import { DateOff } from 'src/app/model/DateOff';

@Component({
  selector: 'app-add-day-of',
  templateUrl: './add-day-of.page.html',
  styleUrls: ['./add-day-of.page.scss'],
})
export class AddDayOfPage implements OnInit {
  public dayOff;
  public datesModels: DateOff[] = [];
  public daysOff: Date[] = [];

  constructor(private dayOffService: NonWorkingDayService ) {
  }

  ngOnInit() {
    this.getDaysOff();
  }

 isDateEnabled = (dateIsoString: string) => {
    const date = new Date(dateIsoString);
    for(let i=0; i<this.daysOff.length; i++){
      if(this.daysOff[i].getUTCMonth() == date.getUTCMonth() && this.daysOff[i].getDate() == date.getDate() && this.daysOff[i].getFullYear()==date.getFullYear()){
        return false;
      }
    }
   
    return !isWeekend(date);
  };

  setDayOff(value){
    this.dayOff=value;

  }
  addDayOff(){
    this.dayOff = moment(this.dayOff).format('YYYY-MM-DD');
    const date=new Date(this.dayOff);
    this.dayOffService.addDayOff(date);
  }

  getDaysOff(){
    this.dayOffService.getDaysOff().subscribe(
      (result) => {
        this.datesModels = result;
        this.datesModels.forEach(element => {
          this.daysOff.push(new Date(element['year'], element['month']-1, element['day']));
        });
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }




}



