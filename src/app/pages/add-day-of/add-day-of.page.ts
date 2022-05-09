import { Component, OnInit } from '@angular/core';
import { isWeekend } from 'date-fns';
@Component({
  selector: 'app-add-day-of',
  templateUrl: './add-day-of.page.html',
  styleUrls: ['./add-day-of.page.scss'],
})
export class AddDayOfPage implements OnInit {



  constructor() {
  }

  ngOnInit() {
  }

 isDateEnabled = (dateIsoString: string) => {
    const date = new Date(dateIsoString);
    return !isWeekend(date);
  };





}



