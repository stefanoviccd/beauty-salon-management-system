import { Injectable } from '@angular/core';
import { TreatmentType } from '../model/TreatmentType';

@Injectable({
  providedIn: 'root'
})
export class TreatmentTypeService {
  public treatments: TreatmentType[];

  constructor() { }
  getTreatments(){
    return this.treatments;
  }
}
