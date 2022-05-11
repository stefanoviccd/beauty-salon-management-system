import { Injectable } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Appointment } from 'src/app/model/Appointment';
import { Role } from 'src/app/model/Role';
import { Treatment } from 'src/app/model/Treatment';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public appointments;
  constructor() { }
  getAppointments(){
    const u=new User('dragana','dragana', 'Dragana','Stefanovic','0876655554', new Role('client'));
    const t=new Treatment('Manikir', '',1200, 0);
    const a1=new Appointment(u,new Date(), '12.30',t, 'zakazan');
    const u2=new User('aleksandra','aleksandra', 'Ana','Furtula','0876655554', new Role('client'));
    const t2=new Treatment('Pedikir', '',1200, 0);
    const a2=new Appointment(u2,new Date(), '12.00',t2, 'zahtevan');
    this.appointments=[a1,a2];
    return this.appointments;
  }
  delete(e: Appointment){
    console.log('Appointment deleted.');
    console.log(e);
  }
  schedule(e: Appointment){
    this.appointments.forEach(element => {
      if(element===e){
        element.status='zakazan';
      }

    });
    console.log('Appointment schdeduled!');

  }
}
