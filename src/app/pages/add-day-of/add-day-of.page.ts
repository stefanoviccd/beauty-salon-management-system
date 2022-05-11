import { Component, OnInit } from '@angular/core';
import { isWeekend, parseISO } from 'date-fns';
import { NonWorkingDayService } from 'src/app/services/nonWorkingDayService/non-working-day.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-day-of',
  templateUrl: './add-day-of.page.html',
  styleUrls: ['./add-day-of.page.scss'],
})
export class AddDayOfPage implements OnInit {
  public dayOff;



  constructor(private dayOffService: NonWorkingDayService ) {
  }

  ngOnInit() {
  }

 isDateEnabled = (dateIsoString: string) => {
    const date = new Date(dateIsoString);
    return !isWeekend(date);
  };

  setDayOff(value){
    this.dayOff=value;

  }
  addDayOff(){
    this.dayOff = moment(this.dayOff).format('YYYY-MM-DD');
    this.dayOffService.addDayOff(this.dayOff);
  }





}



