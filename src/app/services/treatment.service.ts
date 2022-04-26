import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private fireService: AngularFirestore) { }

  createNewTreatment(record){
    return this.fireService.collection('treatments').add(record);

  }
}
