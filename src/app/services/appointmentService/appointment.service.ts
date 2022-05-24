import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Appointment } from 'src/app/model/Appointment';
import { Role } from 'src/app/model/Role';
import { Treatment } from 'src/app/model/Treatment';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
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
  getFreeAppointmentsForTreatment(date: Date, selectedTreatment: number) {
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getFullYear();
    const body = JSON.parse(
      JSON.stringify({
        Day: day,
        Month: month,
        Year: year
      }));
    return this.http.post<string[]>(`${this.url + '/freeAppointmentTime/' + selectedTreatment}`, body);
  }

  getScheduledAppointments() {
    return this.http.get<Appointment[]>(`${this.url + '/scheduled'}`);
  }

  getRequiredAppointments() {
    return this.http.get<Appointment[]>(`${this.url + '/required'}`);
  }

  delete(e: Appointment) {
    return this.http.delete(this.url + '/' + e.id);
  }

  reject(e: Appointment) {
    return this.http.put(this.url + '/reject', e.id);
  }

  schedule(e: Appointment) {
    return this.http.put(this.url + '/accept', e.id);
  }

  getUserAppointments(u: User) {
    return this.http.get<Appointment[]>(`${this.url + '/' + u.email}`);
  }

  addAppointment(
    treatmentId: number,
    username: string,
    day: number,
    month: number,
    year: number,
    hour: number,
    minute: number
  ) {
    const body = JSON.parse(
      JSON.stringify({
        Email: username,
        TreatmentId: treatmentId,
        Day: day,
        Month: month,
        Year: year,
        Hour: hour,
        Minute: minute,
      })
    );

    return this.http.post(this.url, body);
  }

  isTimeAvailable(
    day: number,
    month: number,
    year: number,
    hour: number,
    minute: number
  ) {
    const body = JSON.parse(
      JSON.stringify({
        Day: day,
        Month: month,
        Year: year,
        Hour: hour,
        Minute: minute,
      })
    );

    return this.http.post(this.url + '/checkTime', body);
  }
}
