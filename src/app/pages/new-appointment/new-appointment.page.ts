import { Component, OnInit } from '@angular/core';
import { getDate, getMonth, getYear } from 'date-fns';
import { isWeekend } from 'date-fns';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isDateEnabled = (dateIsoString: string) => {
    // TODO: da se onemoguce plus jos neradni dani iz baze
    const date = new Date(dateIsoString);
    return !isWeekend(date);
  };
}
