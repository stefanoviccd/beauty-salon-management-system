import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NonWorkingDayService {

  constructor() { }
  addDayOff(d: Date){
    console.log(d);

  }
}
