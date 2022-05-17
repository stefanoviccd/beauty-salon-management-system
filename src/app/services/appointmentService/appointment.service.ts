import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  url = 'https://localhost:7018/api/Appointment';

  pipe = new DatePipe('en-US');
  public appointments;
  constructor(private http: HttpClient) {
//     const u=new User('dragana','dragana', 'Dragana','Stefanovic','0876655554', new Role('client'));
//     const t=new Treatment('Manikir', '',1200,1);
//     const a1=new Appointment(u,new Date(), '12.30',t, 'zakazan');
//     const u2=new User('aleksandra','aleksandra', 'Ana','Furtula','0876655554', new Role('client'));
//     const t2=new Treatment('Pedikir', '',1200,2);
//     const a2=new Appointment(u2,new Date(), '12.00',t2, 'zahtevan');
//     this.appointments=[a1,a2];
//     this.appointments.forEach(e=>{
//       e.date=this.pipe.transform(e.date,'dd/MM/yyyy');
//  });
  }

  getScheduledAppointments(){
    return this.http.get<Appointment[]>(`${this.url+"/scheduled"}`);
  }

  getRequiredAppointments(){
    return this.http.get<Appointment[]>(`${this.url+"/required"}`);
  }


  delete(e: Appointment){
    this.http
      .delete(this.url + '/' + e.id)
      .subscribe(
        data => {
        alert('Success deleting');
        location.reload();
      },
      error => {
        alert('Error deleting');
        console.log(error);
      });
  }

  reject(e: Appointment){
    this.http
      .put(this.url + '/reject', e.id)
      .subscribe(
        data => {
        alert('Success rejecting');
        location.reload();
      },
      error => {
        alert('Error rejecting');
        console.log(error);
      });
  }

  schedule(e: Appointment){
    this.http
    .put(this.url + '/accept', e.id)
    .subscribe(
      data => {
      alert('Success scheduling');
      location.reload();
    },
    error => {
      alert('Error scheduling');
      console.log(error);
    });
  }

  

  getUserAppointments(u: User){
    return this.http.get<Appointment[]>(`${this.url + "/" + u.username}`);
  }

  addAppointment(e: Appointment){
    this.appointments.push(e);
    console.log(this.appointments);
  }

}
