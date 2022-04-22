import { Injectable } from '@angular/core';
import { TreatmentType } from './model/TreatmentType';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public treatmentTypes: TreatmentType[];


  constructor() { }
  getTreatmentTypes(){
    return this.treatmentTypes;
  }


}
